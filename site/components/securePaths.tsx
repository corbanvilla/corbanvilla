import path from 'path';
import { fileURLToPath } from "url";
import { PAGES_PATH } from '@/app/constants';

const ALLOWED_PATHS = [path.resolve(PAGES_PATH)];


function isAllowedPath(path: string) {
    for (const allowedPath of ALLOWED_PATHS) {
        if (path.startsWith(allowedPath)) {
            return true;
        }
    }
    return false;
}


/*
 * Invoke with dir: import.meta.url
 */
export function currentDir(dir: string) {
    return path.dirname(fileURLToPath(dir));
}


export function secureJoin(basePath: string, untrustedPath: string) {
    const resolvedPath = path.resolve(basePath, untrustedPath);

    if (!resolvedPath.startsWith(basePath) && !isAllowedPath(resolvedPath)) {
        throw new Error('Attempted directory traversal outside of the base path');
    }

    return resolvedPath;
}
