export interface IIconAttrs {
    xmlns: string;
    width: number;
    height: number;
    viewBox: string;
    classList?: string;
}
declare class Icon {
    name: any;
    contents: any;
    attrs: IIconAttrs;
    constructor(name: string, contents: any);
    toSvg(attrs?: {}): string;
    toString(): any;
}
export default Icon;
