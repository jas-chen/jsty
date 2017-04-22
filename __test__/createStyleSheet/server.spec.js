import createStyleSheet from '../../src/createStyleSheet/server';

const styleName = 'jsty-style';

describe('createStyleSheet/server', () => {
  test('collects style rule', () => {
    const styleSheet = createStyleSheet();
    const rule = '.a{color:red}';
    styleSheet.insertStyleRule(rule);
    expect(styleSheet.getStyleTags()).toEqual(`<style class="${styleName}" media="all">${rule}</style>`);
  });

  test('collects at rule', () => {
    const styleSheet = createStyleSheet();
    const rule = '@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    styleSheet.insertAtRule(rule);
    expect(styleSheet.getStyleTags()).toEqual(`<style class="${styleName}" media="all">${rule}</style>`);
  });

  test('collects both', () => {
    const styleSheet = createStyleSheet();
    const atRule1 = '@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    const atRule2 = '@keyframes spinner2{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}';
    const rule1 = '.a{color:red}';
    const rule2 = '.b{color:blue}';
    styleSheet.insertAtRule(atRule1);
    styleSheet.insertStyleRule(rule1);
    styleSheet.insertAtRule(atRule2);
    styleSheet.insertStyleRule(rule2);
    expect(styleSheet.getStyleTags()).toEqual(`<style class="${styleName}" media="all">${atRule2}${atRule1}${rule1}${rule2}</style>`);
  });

  test('collects into media sheets', () => {
    const media = '@media (max-width:200px)';
    const styleSheet = createStyleSheet(['all', media]);
    const atRule1 = '@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    const atRule2 = '@keyframes spinner2{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}';
    const rule1 = '.a{color:red}';
    const rule2 = '.b{color:blue}';
    styleSheet.insertAtRule(atRule1);
    styleSheet.insertStyleRule(rule1);
    styleSheet.insertAtRule(atRule2);
    styleSheet.insertStyleRule(rule2);
    styleSheet.insertStyleRule(rule1, media);
    styleSheet.insertStyleRule(rule2, media);
    expect(styleSheet.getStyleTags()).toEqual([
      `<style class="${styleName}" media="all">${atRule2}${atRule1}${rule1}${rule2}</style>`,
      `<style class="${styleName}" media="${media}">${rule1}${rule2}</style>`
    ].join(''));
  });

  test('throws when order of media is not correct', () => {
    expect(() => createStyleSheet(['@media (max-width:200px)', 'all'])).toThrow();
  });

  test('throws when media is not string', () => {
    expect(() => createStyleSheet(['all', () => {}])).toThrow();
  });
});
