const DEFAULT_ATTRS = {
    "xmlns": "http://www.w3.org/2000/svg",
    "width": 16,
    "height": 16,
    "viewBox": "0 0 16 16"
};
const isString = (value) => typeof value === 'string' || value instanceof String;
class Icon {
    constructor(name, contents) {
        this.name = name;
        this.contents = contents;
        this.attrs = { ...DEFAULT_ATTRS };
    }
    toSvg(attrs = {}) {
        const combinedAttrs = {
            ...this.attrs,
            ...attrs,
        };
        return `<svg ${attrsToString(combinedAttrs)}>${this.contents}</svg>`;
    }
    toString() {
        return this.contents;
    }
}
function attrsToString(attrs) {
    return Object.keys(attrs)
        .map(key => `${key}="${attrs[key]}"`)
        .join(' ');
}
export default Icon;
//# sourceMappingURL=icon.class.js.map