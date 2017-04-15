export default function createCache(nextClassName, cache = {}) {
  function setAtRuleName(type, name) {
    let entry = cache[type];
    if (!entry) {
      entry = cache[type] = {};
    }

    entry[name] = true;
  }

  function getAtRuleName(type, name) {
    let entry = cache[type];
    if (!entry) {
      entry = cache[type] = {};
      return false;
    }

    return entry.hasOwnProperty(name);
  }

  function getClassName(decls) {
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
        const { media = 'all', sel = '', prop, value } = decl;
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

        if (entry.hasOwnProperty(value)) {
          decl.className = entry[value];
        } else {
          decl.className = entry[value] = nextClassName();

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
    setAtRuleName,
    getAtRuleName,
    getClassName
  };
}
