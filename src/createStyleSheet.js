function createStyleTag(media) {
  const style = document.createElement('style');
  style.setAttribute("media", media);

  // WebKit hack :(
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  return style;
}

export default function createStyleSheet() {
  const styles = {};

  return {
    insert(media, sel, rule) {
      let style;
      if (styles.hasOwnProperty(media)) {
        style = styles[media];
      } else {
        style = styles[media] = createStyleTag(media);
      }

      if (process.env.NODE_ENV !== 'production') {
        style.appendChild(document.createTextNode(`${sel}{${rule}}`));
      } else {
        const { sheet } = style;
        if ('insertRule' in sheet) {
          sheet.insertRule(`${sel}{${rule}}`);
        } else {
          sheet.addRule(sel, rule);
        }
      }
    }
  };
}
