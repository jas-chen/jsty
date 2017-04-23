import { createInsertStyle, createStyleSheet, createPrefixer } from 'jsty';
import { phone, pad } from './mediaQuery';

// config style element order
const styleSheet = createStyleSheet([
  'all',
  pad.query,
  phone.query
]);

const prefixer = createPrefixer();

export default createInsertStyle({
    onAtRule: rule => {
      if (!styleSheet.insertAtRule(rule)) {
        // prefix @keyframes and try again
        if (rule.indexOf('@keyframes') === 0) {
          if (styleSheet.insertAtRule('@-webkit-' + rule.substr(1))) {
            return; // success
          }
        }

        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Unable to insert at-rule into DOM: \`${rule}\`.`);
        }
      }
    },
    onStyleRule: (media, sel, prop, value) => {
      const prefixedDecl = prefixer.prefixDecl(prop, value);

      if (prefixedDecl) {
        if (styleSheet.insertStyleRule(`${sel}{${prefixedDecl}}`, media)) {
          return; // success
        }

        // prefix selector and try again
        const prefixedSel = prefixer.prefixSel(sel);

        if (prefixedSel && styleSheet.insertStyleRule(`${prefixedSel}{${prefixedDecl}}`, media)) {
          return; // success
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Unable to insert CSS rule into DOM: \`${sel} { ${prop}: ${value} }\`.`);
      }
    }
});
