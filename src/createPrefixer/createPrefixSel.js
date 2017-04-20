export default function createPrefixSel(isValidSelector, isFirefox, prefixes, selCache = {}) {
  const placeholder = '::placeholder';
  const placeholderRegex = /::placeholder/g;
  const fullscreen = ':fullscreen';

  return function prefixSel(sel) {
    // ::placeholder
    if (sel.indexOf(placeholder) !== -1) {
      if (selCache.hasOwnProperty(placeholder)) {
        const prefixedSel = selCache[placeholder];
        if (prefixedSel) {
          sel = sel.replace(placeholderRegex, selCache[prefixedSel]);
        } else {
          return;
        }
      } else {
        for (let i = 0 ; i < prefixes.length ; i += 1) {
          const prefix = prefixes[i];
          if (prefix === 'Moz') {
            if (isValidSelector('::-moz-placeholder')) {
              sel = sel.replace(placeholderRegex, '::-moz-placeholder');
              selCache[placeholder] = '::-moz-placeholder';
              break;
            }
          } else if (prefix === 'Webkit') {
            // a hack to deal with Edge browser
            const realPlaceholder = isValidSelector('::-webkit-input-placeholder');
            if (realPlaceholder) {
              sel = sel.replace(placeholderRegex, realPlaceholder);
              selCache[placeholder] = realPlaceholder;
              break;
            }
          } else if (prefix === 'ms') {
            if (isValidSelector(':-ms-input-placeholder')) {
              sel = sel.replace(placeholderRegex, ':-ms-input-placeholder');
              selCache[placeholder] = ':-ms-input-placeholder';
              break;
            }
          }
        }

        if (!selCache.hasOwnProperty(placeholder)) {
          selCache[placeholder] = null;
          return;
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
        const prefixedSel = selCache[placeholder];
        if (prefixedSel) {
          sel = sel.replace(placeholderRegex, selCache[prefixedSel]);
        } else {
          return;
        }
      } else {
        for (let i = 0 ; i < prefixes.length ; i += 1) {
          const prefixedFullscreen = `:-${prefixes[i].toLowerCase()}-full-screen`;
          if (isValidSelector(prefixedFullscreen)) {
            sel = sel.replace(/:fullscreen/g, prefixedFullscreen);
            selCache[fullscreen] = prefixedFullscreen;
            break;
          }
        }

        if (!selCache.hasOwnProperty(fullscreen)) {
          selCache[fullscreen] = null;
          return;
        }
      }
    }

    return sel;
  }
}
