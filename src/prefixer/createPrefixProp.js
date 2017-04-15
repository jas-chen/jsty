import toCamelProp from '../utils/toCamelProp';

export default function createPrefixProp(isValidProp, prefixes, propCache = {}) {
  // propPrefixer() returns a valid prop. It will return undefined if cannot find one.
  return function prefixerProp(prop) {
    if (propCache.hasOwnProperty(prop)) {
      return propCache[prop];
    }

    const firstChar = prop.charAt(0);
    if (firstChar !== '-') {
      const camelCaseProp = firstChar.toUpperCase() + toCamelProp(prop).substr(1);

      for (let i = 0 ; i < prefixes.length ; i += 1) {
        const prefix = prefixes[i];
        if (isValidProp(prefix + camelCaseProp)) {
          return propCache[prop] = `-${prefix.toLowerCase()}-${prop}`;
        }
      }
    }
  }
}
