import fs from 'fs';
import path from "path";
import Svgo from 'svgo'
import cheerio from 'cheerio';
import {config} from '../config';
import htmlMinifier from 'html-minifier';

import FsHelper from "./fs-helper";

const defaultOptions = [
    {convertShapeToPath: false},
    {mergePaths: false},
    {inlineStyles: {onlyMatchedOnce: false}},
    {removeAttrs: {attrs: '(fill|stroke.*)'}},
    {removeTitle: true},
];

const getSvgFunc = (srcPath: string, svgFile: string): Buffer => FsHelper.readFileByPathSync(path.join(srcPath, svgFile));

const getSvgContents = async (svg: Buffer): Promise<string> => {
    const $ = cheerio.load(svg, {xmlMode: true});
    return htmlMinifier.minify(
        $('svg').html(),
        {
            collapseWhitespace: true,
            keepClosingSlash: true,
        });
};

export async function buildIconObject(files: string[]): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    await files.map(async file => {
        try {
            const name = path.basename(file, '.svg');
            const svg = getSvgFunc(config.srcPath, file);
            result[name] = await getSvgContents(svg)
        } catch (e) {
        }
        return result
    })
    return result
}

export async function mergeIconsJson(files: string[]) {
    const resultFile = path.join(path.join(config.root, '../../json'), 'carbon-icons.json');
    const icons = await buildIconObject(files);
    FsHelper.mkDirByPathSync(`${config.root}/json`)


    fs.writeFileSync(resultFile, JSON.stringify(icons));

    console.log(`Has been built ${resultFile}...`);
}
