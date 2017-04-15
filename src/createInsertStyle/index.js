import createClassNameGen from './createClassNameGen';
import createCache from './createCache';

const getMedia = decl => decl.media || 'all';

export default function createInsertStyle(opts = {}) {
  const {
    mediaOrder = ['all'],
    cache: cacheFromServer,
    lastClassName,
    styleSheet
  } = opts;

  if (process.env.NODE_ENV !== 'production') {
    if (mediaOrder[0] !== 'all') {
      console.warn('Expected `mediaOrder[0]` to be \'all\'.');
    }
  }

  const nextClassName = createClassNameGen(lastClassName);
  const cache = createCache(nextClassName, cacheFromServer);
  const sortMedia = (d1, d2) => mediaOrder.indexOf(getMedia(d1)) - mediaOrder.indexOf(getMedia(d2));

  return function insertStyle(decls) {
    const result = cache.getClassName(decls);

    if (result.hasOwnProperty('newDecls')) {
      const orderedDecls = (mediaOrder.length > 1 ? result.newDecls.sort(sortMedia) : result.newDecls);
      for (let i = 0 ; i < decls.length ; i += 1) {
        const decl = decls[i];
        let { value } = decl;

        // FontFace or Keyframes
        if (value['cssText']) {
          const { type } = value;
          const name = value.toString();

          if (!cache.getAtRuleName(type, name)) {
            styleSheet.insertAtRule(value);
            cache.setAtRuleName(type, name);
          }

          value = name;
        }

        styleSheet.insertRule(
          getMedia(decl),
          decl.hasOwnProperty('sel') ? `${decl.sel.replace(/\&/g, `.${decl.className}`)}` : `.${decl.className}`,
          decl.prop,
          value
        );
      }

      if (process.env.NODE_ENV !== 'production') {
        const { newDecls } = result;
        for (let i = 0 ; i < newDecls.length ; i += 1) {
          const decl = newDecls[i];
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
