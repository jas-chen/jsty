import createIsValid from './createIsValid';
import createPrefixDecl from './createPrefixDecl';
import createPrefixSel from './createPrefixSel';

export default function createPrefixer() {
  const isFirefox = /(?:firefox|fxios)\/(\d+)/.test(navigator.userAgent.toLowerCase());
  const prefixes = isFirefox ? ['Moz'] : ['Webkit', 'ms'];
  const isValid = createIsValid();
  const prefixDecl = createPrefixDecl(isValid.decl, isValid.prop, prefixes)
  const prefixSel = createPrefixSel(isValid.sel, isFirefox, prefixes);

  return {
    prefixDecl,
    prefixSel
  };
}
