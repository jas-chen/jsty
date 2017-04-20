import createCache from './createCache';

export default function createInsertStyle(opts = {}) {
  const {
    serverStyles,
    onAtRule,
    onStyleRule
  } = opts;

  const cache = createCache(serverStyles);

  function insert(decl) {
    const { length: oldLength } = cache;
    const className = cache.getClassName(decl);

    if (oldLength !== cache.length) {
      let { value } = decl;

      // @keyframes as value
      if (typeof value !== 'string') {
        const { type, name } = value;

        if (!cache.isAtRuleInserted(type, name)) {
          onAtRule(value.cssText());
          cache.setAtRuleName(type, name);
        }

        value = name;
      }

      onStyleRule(
        decl.hasOwnProperty('media') ? decl.media : 'all',
        decl.hasOwnProperty('sel') ? `.${className}${decl.sel}` : `.${className}`,
        decl.prop,
        value
      );
    }

    return className;
  }

  return function insertStyle(decls) {
    if (Array.isArray(decls)) {
      return decls.map(insert).join(' ');
    } else {
      return insert(decls);
    }
  }
}
