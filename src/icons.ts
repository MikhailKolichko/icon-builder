import Icon from './icon.class';
// @ts-ignore
import icons from '../json/carbon-icons.json';

export default Object.keys(icons)
    .map(key => new Icon(key, icons[key]))
    .reduce((object, icon) => {
        object[icon.name] = icon;

        return object;
    }, {});
