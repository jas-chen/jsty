import createPrefixProp from '../../src/createPrefixer/createPrefixProp';

describe('createPrefixProp', () => {
  test('valids camelCase prop', () => {
    const prefixprop = createPrefixProp(prop => prop === 'marginTop');
    expect(prefixprop('marginTop')).toEqual('margin-top');
  });

  test('valids dash-case prop', () => {
    const prefixprop = createPrefixProp(prop => prop === 'marginTop');
    expect(prefixprop('margin-top')).toEqual('margin-top');
  });

  test('caches prefixed prop', () => {
    const cache = {};
    const prefixprop = createPrefixProp(prop => prop === 'marginTop', [], cache);
    prefixprop('marginTop');
    expect(cache.marginTop).toEqual('margin-top');
  });

  test('return cached prop', () => {
    const cache = { marginTop: 'margin-top' };
    const prefixprop = createPrefixProp(prop => fakse, [], cache);
    expect(prefixprop('marginTop')).toEqual('margin-top');
  });

  test('skips prefixed prop', () => {
    const cache = {};
    const prefixprop = createPrefixProp(prop => prop === 'msGridRows', [], cache);
    expect(prefixprop('msGridRows')).toEqual('-ms-grid-rows');
  });

  test('prefix prop', () => {
    const prefixprop = createPrefixProp(prop => prop === 'WebkitAppearance', ['Webkit']);
    expect(prefixprop('appearance')).toEqual('-webkit-appearance');
  });

  test('prefix prop with re-try', () => {
    const prefixprop = createPrefixProp(prop => prop === 'msGridRows', ['Webkit', 'ms']);
    expect(prefixprop('gridRows')).toEqual('-ms-grid-rows');
  });

  test('returns undefined when not able to prefix', () => {
    const prefixprop = createPrefixProp(prop => false, ['Webkit', 'ms']);
    expect(prefixprop('test')).toEqual(void(0));
  });

  test('returns undefined when prefixed prop is not supported', () => {
    const prefixprop = createPrefixProp(prop => false, ['Webkit', 'ms']);
    expect(prefixprop('msGridRows')).toEqual(void(0));
    expect(prefixprop('ms-grid-rows')).toEqual(void(0));
  });
});
