import icons from './icons';

// const dataAttributesKeys = {
//     'data-eva': 'name',
//     'data-eva-width': 'width',
//     'data-eva-height': 'height',
//     'data-eva-fill': 'fill',
// };

function replace(options = {}) {
    if (typeof document === 'undefined') {
        throw new Error('`eva.replace()` only works in a browser environment.');
    }

    const elementsToReplace = document.querySelectorAll('[data-eva]');

    Array.from(elementsToReplace).forEach(element =>
        replaceElement(element, options),
    );
}

function replaceElement(element: Element, options: {} = {}) {
    const {name, ...elementAttrs} = getAttrs(element);

    const svgString = icons[name].toSvg({
        ...options,
        ...elementAttrs,
    });
    const svgDocument = new DOMParser().parseFromString(
        svgString,
        'text/html',
    );
    const svgElement = svgDocument.querySelector('svg');

    if (svgElement && element.parentNode) element.parentNode.replaceChild(svgElement, element);
}

function getAttrs(element: Element) {
    return Array.from(element.attributes).reduce((attrs: Attr, attr: Attr) => {
        attrs = {
            ...attrs,
            ...getAttr(attr),
        }
        return attrs;
    }, {} as Attr);
}

function getAttr(attr: Attr) {
    return ({[attr.name]: attr.value,});
}

export default replace;
