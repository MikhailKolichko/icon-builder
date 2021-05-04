import fs from 'fs';
import { readdir } from 'fs/promises';
export default class FsHelper {
    static remove(srcPath) {
        return fs.rmdir(srcPath, (err) => {
            if (err)
                console.error(`file ${srcPath} not found`);
        });
    }
    static async filesByPath(srcPath) {
        const files = await readdir(srcPath);
        return { files, fileNames: files.map(f => f.replace(/\.[^/.]+$/, '')) };
    }
    static mkDirByPathSync(targetDir) {
        if (!fs.existsSync(targetDir))
            return fs.mkdirSync(targetDir);
    }
    static async copy(srcPath, destPath) {
        if (fs.existsSync(srcPath))
            return fs.copyFile(srcPath, destPath, fs.constants.COPYFILE_EXCL, () => null);
        return Promise.resolve();
    }
    static isFolder(path) {
        return fs.lstatSync(path).isDirectory();
    }
    static getExtension(fileName) {
        return fileName
            .slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
    }
    static readFileByPathSync(path, options) {
        return fs.readFileSync(path, options);
    }
    static writeFileSync(destPath, file, options) {
        return fs.writeFileSync(destPath, file, options);
    }
}
//# sourceMappingURL=fs-helper.js.map