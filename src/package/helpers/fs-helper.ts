import fs from 'fs';
import {readdir} from 'fs/promises'


export default class FsHelper {
    static remove(srcPath: string): void {
        return fs.rmdir(srcPath, (err) => {
            if (err) console.error(`file ${srcPath} not found`)
        });
    }

    static async filesByPath(srcPath: string): Promise<{ files: string[], fileNames: string[] }> {
        const files = await readdir(srcPath);
        return {files, fileNames: files.map(f => f.replace(/\.[^/.]+$/, ''))}
    }

    static mkDirByPathSync(targetDir: string): void {
        if (!fs.existsSync(targetDir)) return fs.mkdirSync(targetDir);
    }

    static async copy(srcPath: string, destPath: string): Promise<void> {
        if (fs.existsSync(srcPath)) return fs.copyFile(srcPath, destPath, fs.constants.COPYFILE_EXCL, () => null);
        return Promise.resolve();
    }

    static isFolder(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    static getExtension(fileName: string) {
        return fileName
            .slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
    }

    static readFileByPathSync(path: string, options?: { encoding?: null; flag?: string; } | null): Buffer {
        return fs.readFileSync(path, options);
    }

    static writeFileSync(destPath: string, file: Buffer | string, options?: any): void {
        return fs.writeFileSync(destPath, file, options);
    }
}

