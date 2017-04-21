import { createInsertStyle, createStyleSheet, createPrefixer } from 'jsty';
import { phone, pad } from './mediaQuery';

const styleSheet = createStyleSheet([
  'all',
  phone.query,
  pad.query
]);

const prefixer = createPrefixer();

export default createInsertStyle({
    onAtRule: rule => {
      if (!styleSheet.insertAtRule(rule)) {
        if (rule.indexOf('@keyframes') === 0) {
          // prefix @keyframes
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
          return;
        }

        // try to insert the rule with prefixed selector
        const prefixedSel = prefixer.prefixSel(sel);

        if (prefixedSel && styleSheet.insertStyleRule(`${prefixedSel}{${prefixedDecl}}`, media)) {
          return;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Unable to insert CSS rule into DOM: \`${sel} { ${prop}: ${value} }\`.`);
      }
    }
});
