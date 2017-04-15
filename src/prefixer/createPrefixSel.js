export default function createPrefixSel(isValidSelector, isFirefox, prefixes, selCache = {}) {
  const placeholder = '::placeholder';
  const placeholderRegex = /::placeholder/g;
  const fullscreen = ':fullscreen';
  const fullscreenRegex = /:fullscreen/g;

  return function prefixSel(sel) {
    // ::placeholder
    if (sel.indexOf(placeholder) !== -1) {
      if (selCache.hasOwnProperty(placeholder)) {
        sel = sel.replace(placeholderRegex, selCache[placeholder]);
      } else {
        for (let i = 0 ; i < prefixes.length ; i += 1) {
          const prefix = prefixes[i];
          if (prefix === 'Moz') {
            if (isValidSelector('::-moz-placeholder')) {
              sel = sel.replace(placeholderRegex, '::-moz-placeholder');
              selCache[placeholder] = '::-moz-placeholder';
            }
          } else if (prefix === 'Webkit') {
            // a hack to deal with Edge browser
            const realPlaceholder = isValidSelector('::-webkit-input-placeholder');
            if (realPlaceholder) {
              sel = sel.replace(placeholderRegex, realPlaceholder);
              selCache[placeholder] = realPlaceholder;
            }
          } else if (prefix === 'ms') {
            if (isValidSelector(':-ms-input-placeholder')) {
              sel = sel.replace(placeholderRegex, ':-ms-input-placeholder');
              selCache[placeholder] = ':-ms-input-placeholder';
            }
          }
        }
      }
    }

    // ::selection
    if (sel.indexOf('::selection') !== -1 && isFirefox) {
      sel = sel.replace(/::selection/g, '::-moz-selection');
    }

    // :full-screen
    if (sel.indexOf(fullscreen) !== -1) {
      if (selCache.hasOwnProperty(fullscreen)) {
        sel = sel.replace(fullscreenRegex, selCache[fullscreen]);
      } else {
        for (let i = 0 ; i < prefixes.length ; i += 1) {
          const prefixed = `:-${prefixes[i].toLowerCase()}-full-screen`;
          if (isValidSelector(prefixed)) {
            sel = sel.replace(fullscreenRegex, prefixed);
            selCache[fullscreen] = prefixed;
          }
        }
      }
    }

    return sel;
  }
}
