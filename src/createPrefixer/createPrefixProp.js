import toCamelProp from '../utils/toCamelProp';
import toDashProp from '../utils/toDashProp';

export default function createPrefixProp(isValidProp, prefixes, propCache = {}) {
  return function prefixerProp(prop, dashProp) {
    if (prop.indexOf('-') !== -1) {
      dashProp = prop;
      prop = toCamelProp(prop);
    }

    if (propCache.hasOwnProperty(prop)) {
      return propCache[prop];
    }

    if (isValidProp(prop)) {
      return propCache[prop] = (dashProp || toDashProp(prop));
    }

    if (!(/^(ms[A-Z]|[A-Z])/).test(prop)) { // not prefixed
      const part = prop.charAt(0).toUpperCase() + prop.substr(1);

      for (let i = 0 ; i < prefixes.length ; i += 1) {
        const prefixedProp = prefixes[i] + part;
        if (isValidProp(prefixedProp)) {
          return propCache[prop] = toDashProp(prefixedProp);
        }
      }
    }

    propCache[prop] = void(0);
  }
}
