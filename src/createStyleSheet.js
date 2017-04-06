function createStyleTag(media) {
  const style = document.createElement('style');
  style.setAttribute("media", media);

  // WebKit hack :(
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  return style;
}

export default function createStyleSheet(opts = {}) {
  const {
    sheets = {}
  } = opts;

  function insert(media, sel, rule) {
    const isAtRule = sel.length && sel.charAt(0) === '@';
    let styleTag;

    if (sheets.hasOwnProperty(media)) {
      styleTag = sheets[media];
    } else {
      styleTag = createStyleTag(media);
      sheets[media] = styleTag;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isAtRule) {
        styleTag.insertBefore(document.createTextNode(sel), styleTag.firstChild);
      } else {
        styleTag.appendChild(document.createTextNode(`${sel}{${rule}}`));
      }
    } else {
      if (isAtRule) {
        styleTag.sheet.insertRule(sel, 0);
      } else {
        const { sheet } = styleTag;
        sheet.insertRule(`${sel}{${rule}}`, sheet.cssRules.length);
      }
    }
  }

  return {
    insert
  };
}
