import createClassNameGen from './createClassNameGen';
import createCache from './createCache';

const defaultOpts = {};
const defaultCalculateRule = (prop, val) => `${prop}:${val};`;
const defaultMediaOrder = ['all'];
const getMedia = decl => decl.hasOwnProperty('media') ? decl.media : 'all';

export default function createInsertCSS(opts = defaultOpts) {
  const {
    calculateRule = defaultCalculateRule,
    mediaOrder = defaultMediaOrder,
    cache: cacheFromServer,
    lastClassName
  } = opts;

  const cache = createCache(
    cacheFromServer,
    createClassNameGen(lastClassName)
  );

  const sortMedia = (d1, d2) => mediaOrder.indexOf(getMedia(d1)) - mediaOrder.indexOf(getMedia(d2));

  return function insertCSS(styleSheet) {
    return function css(decls) {
      const result = cache.get(decls);

      if (result.hasOwnProperty('newDecls')) {
        for (const decl of (mediaOrder.length > 1 ? result.newDecls.sort(sortMedia) : result.newDecls)) {
          const rule = calculateRule(decl.prop, decl.value);

          if (process.env.NODE_ENV !== 'production') {
            if (typeof rule !== 'string') {
              throw new TypeError(`Expected \`calculateRule()\` to return a string. It returned ${rule}.`);
            }
          }

          styleSheet.insert(
            getMedia(decl),
            `.${decl.className}${decl.hasOwnProperty('sel') ? decl.sel : ''}`,
            rule
          );
        }

        if (process.env.NODE_ENV !== 'production') {
          for (const decl of result.newDecls) {
            const media = getMedia(decl);

            if (mediaOrder.indexOf(media) === -1) {
              console.warn(`Media query not found in \`mediaOrder\`: \"${media}\"`);
            }
          }
        }
      }

      return result.className;
    }
  }
}
