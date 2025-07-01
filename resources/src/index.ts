import { Env } from './types';
import { renderTemplFull } from './render';
import { getSiteConfig } from './config';

async function listBucket(bucket: R2Bucket, options?: R2ListOptions): Promise<R2Objects> {
    // List all objects in the bucket, launch new request if list is truncated
    const objects: R2Object[] = [];
    const delimitedPrefixes: string[] = [];

    // delete limit, cursor in passed options
    const requestOptions = {
        ...options,
        limit: undefined,
        cursor: undefined,
    };

    var cursor = undefined;
    while (true) {
        const index = await bucket.list({
            ...requestOptions,
            cursor,
        });
        objects.push(...index.objects);
        delimitedPrefixes.push(...index.delimitedPrefixes);
        if (!index.truncated) {
            break;
        }
        cursor = index.cursor;
    }
    return {
        objects,
        delimitedPrefixes,
        truncated: false
    };
}

function buildRedirect(path: string): Response {
    return Response.redirect(`https://www.corbanvilla.com/resources?path=${path}`, 301);
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const domain = url.hostname;
        const path = url.pathname;

        // make the request to R2 backend
        const originResponse = await fetch(request);

        // if it's a valid file, return the file
        if (originResponse.status !== 404) {
            return originResponse;
        }

        // if it's not under /public, don't index it, redirect to homepage
        if (!path.startsWith('/public')) {
            return buildRedirect(path);
        }

        // remove the leading '/'
        let objectKey = path.slice(1);
        const siteConfig = getSiteConfig(env, domain);
        if (!siteConfig) {
            return originResponse;
        }

        // add a trailing / if not exist
        if (!objectKey.endsWith('/')) {
            objectKey += '/';
        }

        // list objects in the bucket
        const bucket = siteConfig.bucket;
        const index = await listBucket(bucket, {
            prefix: objectKey,
            delimiter: '/',
            include: ['httpMetadata', 'customMetadata']
        });

        // if no object found, return origin response (404)
        if (index.objects.length === 0 && index.delimitedPrefixes.length === 0) {
            return buildRedirect(path);
        }

        return new Response(
            renderTemplFull(index.objects, index.delimitedPrefixes, path, siteConfig),
            {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                },
                status: 200,
            },
        );
    },
};
