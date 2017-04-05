import createClassNameGen from './createClassNameGen';
import createCache from './createCache';

const defaultCalculateRule = (prop, val) => `${prop}:${val};`;
const getMedia = decl => decl.hasOwnProperty('media') ? decl.media : 'all';

export default function createInsertCSS({ calculateRule = defaultCalculateRule, mediaOrder, cache: cacheFromServer, lastClassName }) {
  const cache = createCache(
    cacheFromServer,
    createClassNameGen(lastClassName)
  );

  const sortMedia = (d1, d2) => mediaOrder.indexOf(getMedia(d1)) - mediaOrder.indexOf(getMedia(d2));

  return function insertCSS(styleSheet) {
    return function css(decls) {
      const result = cache.get(decls);

      if (result.hasOwnProperty('newDecls')) {
        for (const decl of (mediaOrder ? result.newDecls.sort(sortMedia) : result.newDecls)) {
          const rule = calculateRule(decl.prop, decl.value);

          styleSheet.insert(
            getMedia(decl),
            `.${decl.className}${decl.hasOwnProperty('sel') ? decl.sel : ''}`,
            rule
          );
        }
      }

      return result.className;
    }
  }
}
