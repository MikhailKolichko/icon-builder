/// <reference types="node" />
export default class FsHelper {
    static remove(srcPath: string): void;
    static filesByPath(srcPath: string): Promise<{
        files: string[];
        fileNames: string[];
    }>;
    static mkDirByPathSync(targetDir: string): void;
    static copy(srcPath: string, destPath: string): Promise<void>;
    static isFolder(path: string): boolean;
    static getExtension(fileName: string): string;
    static readFileByPathSync(path: string, options?: {
        encoding?: null;
        flag?: string;
    } | null): Buffer;
    static writeFileSync(destPath: string, file: Buffer | string, options?: any): void;
}
