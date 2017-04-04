import Cache from './Cache';

const media = decl => decl.hasOwnProperty('media') ? decl.media : 'all';

export default function createGetClassName({ calculateRule, mediaOrder, cache }) {
  cache = new Cache(cache);
  const sortMedia = (d1, d2) => mediaOrder.indexOf(media(d1)) - mediaOrder.indexOf(media(d2));

  return sheet => function getClassName(decls) {
    const result = cache.get(decls);

    if (result.hasOwnProperty('newDecls')) {
      for (const decl of (mediaOrder ? result.newDecls.sort(sortMedia) : result.newDecls)) {
        const rule = calculateRule(decl.prop, decl.value);
        sheet.insert(
          media(decl),
          `.${decl.className}${decl.hasOwnProperty('sel') ? decl.sel : ''}`,
          rule
        );
      }
    }

    return result.className;
  }
}
