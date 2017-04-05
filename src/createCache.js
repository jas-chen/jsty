export default function createCache(cache = {}, nextClassName) {
  function get(decls) {
    if (decls.hasOwnProperty('className')) {
      return {
        className: decls.className
      };
    }

    const classNames = [];
    let newDecls;

    for (const decl of decls) {
      let className;

      if (decl.hasOwnProperty('className')) {
        className = decl.className;
      } else {
        const { media = 'all', sel = '', prop, val } = decl;
        className = cache;

        if (className.hasOwnProperty(media)) {
          className = className[media];
        } else {
          className = className[media] = {};
        }

        if (className.hasOwnProperty(sel)) {
          className = className[sel];
        } else {
          className = className[sel] = {};
        }

        if (className.hasOwnProperty(prop)) {
          className = className[prop];
        } else {
          className = className[prop] = {};
        }

        if (className.hasOwnProperty(val)) {
          className = className[val];
        } else {
          className = className[val] = nextClassName();

          if (!newDecls) {
            newDecls = [];
          }

          newDecls.push(decl);
        }

        decl.className = className;
      }

      classNames.push(className);
    }

    const className = classNames.join(' ');
    decls.className = className;

    const result = {
      className
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
