import toCamelProp from './toCamelProp';
import createStyleTag from './createStyleTag';

function createTestSheet() {
  const styleTag = createStyleTag();
  if (process.env.NODE_ENV !== 'production') {
    styleTag.setAttribute('id', 'jsty-test');
  }

  return styleTag.sheet;
}

export default function createIsValid() {
  const { style } = document.createElement('div');
  const testSheet = createTestSheet();

  function isValidProp(prop) {
    if (prop.indexOf('-') !== -1) {
      prop = toCamelProp(prop);
    }

    return prop in style;
  }

  function isValidRule(prop, value) {
    if (process.env.NODE_ENV !== 'production') {
      if (arguments.length !== 2) {
        throw new TypeError(`Expected 2 arguments passed into \`isValidValue()\`.`);
      }
    }

    style.cssText = `${prop}:${value}`;
    return !!style.length;
  }

  function isValidSelector(sel) {
    try {
      testSheet.insertRule(`.test${sel}{color:#fff;}`, 0);
      // a hack to deal with Edge browser.
      const { selectorText } = testSheet.cssRules.item(0);
      testSheet.deleteRule(0); // reset
      return selectorText.substring(5 /* skip `.test` */);
    } catch(e) {
      return false;
    }
  }

  return {
    prop: isValidProp,
    rule: isValidRule,
    sel: isValidSelector
  };
}
