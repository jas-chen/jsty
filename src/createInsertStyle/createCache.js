import createClassNameGen from './createClassNameGen';

const postfix = typeof window === 'undefined' ? '-' : '_';

export default function createCache(cache = {}) {
  const nextClassName = createClassNameGen();
  let count = 0;

  function setAtRuleName(type, name) {
    let entry = cache[type];
    if (!entry) {
      entry = cache[type] = {};
    }

    entry[name] = true;
  }

  function isAtRuleInserted(type, name) {
    let entry = cache[type];
    if (!entry) {
      entry = cache[type] = {};
      return false;
    }

    return entry.hasOwnProperty(name);
  }

  function getClassName(decl, prefix) {
    if (decl.hasOwnProperty('className')) {
      return decl.className;
    }

    const { media = 'all', sel = '', prop, value } = decl;
    let entry = cache[media];

    if (!entry) {
      entry = cache[media] = {};
    }

    if (entry.hasOwnProperty(sel)) {
      entry = entry[sel];
    } else {
      entry = entry[sel] = {};
    }

    if (entry.hasOwnProperty(prop)) {
      entry = entry[prop];
    } else {
      entry = entry[prop] = {};
    }

    if (entry.hasOwnProperty(value)) {
      return decl.className = entry[value];
    } else {
      count += 1;
      return decl.className = entry[value] = nextClassName() + postfix;
    }
  }

  return {
    setAtRuleName,
    isAtRuleInserted,
    getClassName,
    get length() {
      return count;
    }
  };
}
