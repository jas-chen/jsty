

import createPrefixProp from './createPrefixProp';
import createPrefixValue from './createPrefixValue';
import createPrefixSel from './createPrefixSel';

// create a custom Prefixer should be very easy.
export default class Prefixer {
  constructor(isValidProp, isValidRule, isValidSelector) {
    const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(navigator.userAgent.toLowerCase());
    const prefixes = isFirefox ? ['Moz'] : ['Webkit', 'ms'];

    this.prefixProp = createPrefixProp(isValidProp, prefixes);
    this.prefixValue = createPrefixValue(isValidRule, isValidProp, this.propPrefixer, prefixes);
    this.prefixSel = createPrefixSel(isValidSelector, isFirefox, prefixes);
  }
}
