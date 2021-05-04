import { config } from "./config";
import { mergeIconsJson } from "./helpers/merge-icons-json";
import FsHelper from './helpers/fs-helper';
import path from "node:path";
async function parse() {
    FsHelper.remove(path.join(config.root, '../../json'));
    FsHelper.mkDirByPathSync(path.join(config.root, '../../json'));
    const files = await FsHelper.filesByPath(config.srcPath);
    await mergeIconsJson(files.files);
}
parse().then();
//# sourceMappingURL=index.js.map