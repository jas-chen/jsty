import createStyleElement from '../../src/utils/createStyleElement';

describe('createStyleElement', () => {
  test('Creates style elemnt', () => {
    expect(createStyleElement().tagName).toEqual('STYLE');
  });

  test('Creates style elemnt with media query', () => {
    const query = '(max-width:100px)';
    const ele = createStyleElement(query);
    expect(ele.tagName).toEqual('STYLE');
    expect(ele.media).toEqual(query);
  });
});
