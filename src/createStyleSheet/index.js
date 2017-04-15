import createStyleTag from '../utils/createStyleTag';
import createIsValid from '../utils/createIsValid';

export default function createStyleSheet(opts = {}) {
  const {
    styleTags = {},
    Prefixer
  } = opts;

  const isValid = createIsValid();
  const prefixer = new Prefixer(isValid.prop, isValid.rule, isValid.sel);

  if (process.env.NODE_ENV !== 'production') {
    ['prefixProp', 'prefixValue', 'prefixSel'].forEach(key => {
      if (typeof prefixer[key] !== 'function') { throw new TypeError(`Expected \`prefixer.${key}\` to be a function.`); }
    });
  }

  function getStyleTag(media) {
    const styleTag = styleTags[media];
    return styleTag || (styleTags[media] = createStyleTag(media));
  }

  function insertAtRule(rule) {
    const styleTag = getStyleTag('all');
    const cssText = rule.cssText();

    try {
      sheet.insertRule(cssText, 0);
    } catch(e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Failed to insert at-rule:\n${cssText}.`);
      }
    }
  }

  function tryInsertRule(sheet, rule) {
    try {
      sheet.insertRule(rule, sheet.cssRules.length);
      return true;
    } catch (e) {
      return false;
    }
  }

  function insertRule(media, sel, prop, value) {
    if (process.env.NODE_ENV !== 'production') {
      ['media', 'sel', 'prop', 'value'].forEach(key => {
        if (typeof key !== 'string') { throw new TypeError(`Expected \`${key}\` to be a string.`); }
      });
    }

    const { sheet } = getStyleTag(media);
    let prefixedProp;
    let prefixedValue;
    let prefixedSel;

    if (!isValid.rule(prop, value)) {
      if (!isValid.prop(prop)) {

        prefixedProp = prefixer.prefixProp(prop);

        if (process.env.NODE_ENV !== 'production') {
          if (prefixedProp !== void(0) && typeof prefixedProp !== 'string') {
            throw new TypeError(`Expected \`prefixer.prefixProp()\` to return a string or undefined.`);
          }
        }

        if (!prefixedProp) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`Unsupported prop (by current browser): \`${prop}\`.`);
          }

          return;
        }
      } else {
        prefixedProp = prop;
      }

      if (!isValid.rule(prefixedProp, value)) {
        prefixedValue = prefixer.prefixValue(prefixedProp, value);

        if (process.env.NODE_ENV !== 'production') {
          if (prefixedValue !== void(0) && typeof prefixedValue !== 'string') {
            throw new TypeError(`Expected \`prefixer.prefixValue()\` to return a string or undefined.`);
          } else if (prefixedValue && prefixedValue.indexOf(';') !== -1) {
            console.warn(`\`prefixer.prefixValue()\` seems to append additional rules, this will cause server sider rendering to fail.`)
          }
        }

        if (!prefixedValue) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`Unsupported rule (by current browser): \`${prefixedProp}:${value}\`.`);
          }

          return;
        }
      }
    }

    const rule = `{${prefixedProp || prop}:${prefixedValue || value}}`;

    if (!tryInsertRule(sheet, sel + rule)) {
      prefixedSel = prefixer.prefixSel(sel);

      if (process.env.NODE_ENV !== 'production') {
        if (prefixedSel !== void(0) && typeof prefixedSel !== 'string') {
          throw new TypeError(`Expected \`prefixer.prefixSel()\` to return a string or undefined.`);
        }
      }

      if (prefixedSel !== sel && tryInsertRule(sheet, prefixedSel + rule)) {
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Unsupported selector (by current browser): \`${prefixedSel || sel}\`.`);
      }
    }
  }

  return {
    insertAtRule,
    insertRule
  };
}
