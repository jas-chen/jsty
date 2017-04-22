export default function createPrefixSel(isValidSelector, isFirefox, prefixes, selCache = {}) {
  const placeholder = '::placeholder';
  const placeholderRegex = /::placeholder/g;
  const selection = '::selection';
  const selectionRegex = /::selection/g;
  const fullscreen = ':fullscreen';
  const fullscreenRegex = /:fullscreen/g;

  return function prefixSel(sel) {
    // ::placeholder
    if (sel.indexOf(placeholder) !== -1) {
      if (selCache.hasOwnProperty(placeholder)) {
        const prefixedSel = selCache[placeholder];
        if (prefixedSel) {
          sel = sel.replace(placeholderRegex, prefixedSel);
        } else {
          return;
        }
      } else if (isValidSelector(placeholder)) {
        sel = sel.replace(placeholderRegex, placeholder);
        selCache[placeholder] = placeholder;
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
          selCache[placeholder] = void(0);
          return;
        }
      }
    }

    // ::selection
    if (sel.indexOf(selection) !== -1) {
      if (selCache.hasOwnProperty(selection)) {
        const prefixedSel = selCache[selection];
        if (prefixedSel) {
          sel = sel.replace(selectionRegex, prefixedSel);
        } else {
          return;
        }
      } else {
        if (isValidSelector(selection)) {
          sel = sel.replace(selectionRegex, selection);
          selCache[selection] = selection;
        } else if (isFirefox && isValidSelector('::-moz-selection')) {
          sel = sel.replace(selectionRegex, '::-moz-selection');
          selCache[selection] = '::-moz-selection';
        } else {
          selCache[selection] = void(0);
          return;
        }
      }
    }

    // :full-screen
    if (sel.indexOf(fullscreen) !== -1) {
      if (selCache.hasOwnProperty(fullscreen)) {
        const prefixedSel = selCache[fullscreen];
        if (prefixedSel) {
          sel = sel.replace(fullscreenRegex, prefixedSel);
        } else {
          return;
        }
      } else if (isValidSelector(fullscreen)) {
        sel = sel.replace(fullscreenRegex, fullscreen);
        selCache[fullscreen] = fullscreen;
      } else {
        for (let i = 0 ; i < prefixes.length ; i += 1) {
          const prefix = prefixes[i];
          const prefixedFullscreen = prefix === 'ms' ? ':-ms-fullscreen' : `:-${prefix.toLowerCase()}-full-screen`;
          if (isValidSelector(prefixedFullscreen)) {
            sel = sel.replace(fullscreenRegex, prefixedFullscreen);
            selCache[fullscreen] = prefixedFullscreen;
            break;
          }
        }

        if (!selCache.hasOwnProperty(fullscreen)) {
          selCache[fullscreen] = void(0);
          return;
        }
      }
    }

    return sel;
  }
}
