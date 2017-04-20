import toCamelProp from './utils/toCamelProp';

export default function hydrateCache(target = '.jsty-style') {
  const styleFromServer = {};

  if (typeof target === 'string') {
    target = document.querySelectorAll(target);
  }

  target.forEach(element => {
    const root = styleFromServer[element.media] = {};
    const { cssRules } = element.sheet;

    for (let i = 0 ; i < cssRules.length ; i += 1) {
      const item = cssRules.item(i);

      if (item.type === CSSRule.STYLE_RULE) {
        const [className, sel] = item.selectorText.split('_');

        if (!root.hasOwnProperty(sel)) {
          root[sel] = {};
        }

        const selEntry = root[sel];

        for (let j = 0 ; j < item.style.length ; j += 1) {
          let entry = selEntry;
          let [prop, value] = item.style.cssText.split(/:|;/);

          prop = toCamelProp(prop.replace(/^(-webkit-|-moz-|-ms-)/, ''));
          value = value.trim().replace(/^(-webkit-|-moz-|-ms-)/, '');

          if (!entry.hasOwnProperty(prop)) {
            entry[prop] = {};
          }

          entry[prop][value] = className.substr(1) + '_';
        }
      } else if (item.type === CSSRule.KEYFRAMES_RULE) {
        if (!styleFromServer.hasOwnProperty('@keyframes')) {
          styleFromServer['@keyframes'] = {
            [item.name]: true
          };
        } else {
          styleFromServer['@keyframes'][item.name] = true;
        }
      }
    }
  });

  return styleFromServer;
}
