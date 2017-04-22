export default function createPrefixValue(isValidDecl, prefixProp, prefixes, valueCache = {}) {
  function prefixTransitionValue(value) {
    if ((/^all/).test(value)) {
      return value;
    }

    const firstWs = value.indexOf(' ');

    if (firstWs === -1) { // transition-property
      const prop = prefixProp(value);
      if (prop) {
        return prop;
      }
    } else {
      const prop = prefixProp(value.substr(0, firstWs));
      if (prop) {
        return prop + value.substr(firstWs);
      }
    }
  }

  return function prefixValue(prop, value) {
    const key = prop + value;

    if (valueCache.hasOwnProperty(key)) {
      return valueCache[key];
    }

    if (isValidDecl(prop, value)) {
      return valueCache[key] = value;
    }

    if ((/transition(?:-property)?$/).test(prop)) {
      if (value.indexOf(',') !== -1) {
        // only split multi values, not cubic beziers
        const values = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
        const prefixedValues = [];

        for (let i = 0 ; i < values.length ; i += 1) {
          const prefixedValue = prefixTransitionValue(values[i].trim());

          if (!prefixedValue) {
            valueCache[key] = void(0);
            return;
          }

          prefixedValues.push(prefixedValue);
        }

        return valueCache[key] = prefixedValues.join(',');
      }

      value = prefixTransitionValue(value);

      if (value) {
        return valueCache[key] = value;
      }
    } else {
      for (let i = 0 ; i < prefixes.length ; i += 1) {
        const prefixedValue = `-${prefixes[i].toLowerCase()}-${value}`;
        if (isValidDecl(prop, prefixedValue)) {
          return valueCache[key] = prefixedValue;
        }
      }
    }

    valueCache[key] = void(0);
  };
}
