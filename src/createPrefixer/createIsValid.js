import createStyleElement from '../utils/createStyleElement';

function createTestSheet() {
  const styleTag = createStyleElement('(max-width: 1px)');
  if (process.env.NODE_ENV !== 'production') {
    styleTag.setAttribute('class', 'jsty-test');
  }

  return styleTag.sheet;
}

export default function createIsValid() {
  const { style } = document.createElement('div');
  const testSheet = createTestSheet();

  const supports = (('CSS' in window) && ('supports' in window.CSS))
    ? window.CSS.supports
    : (prop, value) => {
      style.cssText = `${prop}:${value}`;
      return !!style.length;
    }

  const isValidProp = prop => prop in style;

  function isValidDeclaration(prop, value) {
    if (process.env.NODE_ENV !== 'production') {
      if (arguments.length !== 2) {
        throw new TypeError(`Expected 2 arguments passed into \`isValidValue()\`.`);
      }

      if ((/[A-Z]/).test(prop)) {
        throw new Error(`Expected prop to be dash-case: \`${prop}\`.`);
      }
    }

    return supports(prop, value);
  }

  function isValidSelector(sel) {
    try {
      testSheet.insertRule(`.jsty${sel}{color:#fff;}`, 0);
      // a hack to deal with Edge browser.
      const { selectorText } = testSheet.cssRules.item(0);
      testSheet.deleteRule(0); // reset
      return selectorText.substring(5); // remove `.jsty`
    } catch(e) {
      return false;
    }
  }

  return {
    prop: isValidProp,
    decl: isValidDeclaration,
    sel: isValidSelector
  };
}
