import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    root: __dirname,
    'srcPath': 'node_modules/@carbon/icons/svg/32',
}

