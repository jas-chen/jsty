import toCamelProp from '../../src/utils/toCamelProp';

describe('toCamelProp', () => {
  test('Normal prop', () => {
    expect(toCamelProp('margin')).toEqual('margin');
    expect(toCamelProp('margin-top')).toEqual('marginTop');
    expect(toCamelProp('border-top-left-radius')).toEqual('borderTopLeftRadius');
  });

  test('Prefixed prop', () => {
    expect(toCamelProp('-webkit-appearance')).toEqual('WebkitAppearance');
    expect(toCamelProp('-ms-grid-rows')).toEqual('msGridRows');
  });
});
