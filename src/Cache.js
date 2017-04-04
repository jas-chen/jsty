import ClassNameGen from './ClassNameGen';

export default class Cache {
  constructor(cache = {}, lastClassName) {
    this.cache = cache;
    this.classNameGen = new ClassNameGen(lastClassName);
  }

  get(decls) {
    if (decls.hasOwnProperty('className')) {
      return {
        className: decls.className
      };
    }

    const classNames = [];
    const newDecls = [];

    for (const decl of decls) {
      let className;

      if (decl.hasOwnProperty('className')) {
        className = decl.className;
      } else {
        const { media = 'all', sel = '', prop, val } = decl;
        className = this.cache;

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
          className = className[val] = this.classNameGen.next();
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

    if (newDecls.length) {
      result.newDecls = newDecls;
    }

    return result;
  }
}
