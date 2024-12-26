import path from 'path';
import { fileURLToPath } from "url";


/*
 * Invoke with dir: import.meta.url
 */
export function currentDir(dir: string) {
    return path.dirname(fileURLToPath(dir));
}


export function secureJoin(basePath: string, untrustedPath: string) {
    const resolvedPath = path.resolve(basePath, untrustedPath);

    if (!resolvedPath.startsWith(basePath)) {
        throw new Error('Attempted directory traversal outside of the base path');
    }

    return resolvedPath;
}
