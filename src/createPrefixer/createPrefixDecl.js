import createPrefixProp from './createPrefixProp';
import createPrefixValue from './createPrefixValue';
import toDashProp from '../utils/toDashProp';

export default function createPrefixDecl(isValidDecl, isValidProp, prefixes) {
  const prefixProp = createPrefixProp(isValidProp, prefixes);
  const prefixValue = createPrefixValue(isValidDecl, prefixProp, prefixes);

  return function prefixDecl(prop, value) {
    const dashProp = toDashProp(prop);

    if (isValidDecl(dashProp, value)) {
      return `${dashProp}:${value}`;
    }

    if ((prop = prefixProp(prop, dashProp) && (value = prefixValue(prop, value)))) {
      return `${prop}:${value}`;
    }
  }
}
