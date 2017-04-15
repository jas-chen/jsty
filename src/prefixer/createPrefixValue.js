export default function createPrefixValue(isValidRule, isValidProp, propPrefixer, prefixes, valueCache = {}) {
  return function prefixValue(prefixedProp, value) {
    const key = prefixedProp + value;
    if (valueCache.hasOwnProperty(key)) {
      return valueCache[key];
    }

    if (value.indexOf(',') !== -1 && transitionRegex.test(/transition(?:-property)?$/)) {
      // only split multi values, not cubic beziers
      const values = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
      const prefixedValues = [];

      for (let i = 0 ; i < values.length ; i += 1) {
        const transValue = values[i];
        if (isValidProp(transValue)) {
          prefixedValues.push(transValue);
        } else {
          const prefixedValue = propPrefixer(transValue);
          prefixedValues.push(prefixedValue || transValue);
        }
      }

      return prefixedValues.join(',');
    } else {
      for (let i = 0 ; i < prefixes.length ; i += 1) {
        const prefixedValue = `-${prefixes[i].toLowerCase()}-${value}`;
        if (isValidRule(prefixedProp, prefixedValue)) {
          return valueCache[key] = prefixedValue;
        }
      }
    }
  };
}
