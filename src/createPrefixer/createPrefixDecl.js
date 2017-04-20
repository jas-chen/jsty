import createPrefixProp from './createPrefixProp';
import createPrefixValue from './createPrefixValue';

export default function createPrefixDecl(isValidDecl, isValidProp, prefixes) {
  const prefixProp = createPrefixProp(isValidProp, prefixes);
  const prefixValue = createPrefixValue(isValidDecl, prefixProp, prefixes);

  return function prefixDecl(prop, value) {
    prop = prefixProp(prop);

    if (prop && (isValidDecl(prop, value) || (value = prefixValue(prop, value)))) {
      return `${prop}:${value}`;
    }
  }
}
