export default function createCache(nextClassName, cache = {}) {
  function get(decls) {
    if (decls.hasOwnProperty('className')) {
      return {
        className: decls.className
      };
    }

    const classNames = [];
    let newDecls;

    for (let i = 0 ; i < decls.length ; i += 1) {
      const decl = decls[i];
      if (!decl.hasOwnProperty('className')) {
        const { media = 'all', sel = '', prop, val } = decl;
        let entry = cache[media];

        if (!entry) {
          entry = cache[media] = {};
        }

        if (entry.hasOwnProperty(prop)) {
          entry = entry[prop];
        } else {
          entry = entry[prop] = {};
        }

        if (entry.hasOwnProperty(sel)) {
          entry = entry[sel];
        } else {
          entry = entry[sel] = {};
        }

        if (entry.hasOwnProperty(val)) {
          decl.className = entry[val];
        } else {
          decl.className = entry[val] = nextClassName();

          if (!newDecls) {
            newDecls = [];
          }

          newDecls.push(decl);
        }
      }

      classNames.push(decl.className);
    }

    const finalClassNames = classNames.join(' ');
    decls.className = finalClassNames;

    const result = {
      className: finalClassNames
    };

    if (newDecls) {
      result.newDecls = newDecls;
    }

    return result;
  }

  return {
    get
  };
}
