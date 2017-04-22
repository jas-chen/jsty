import createPrefixValue from '../../src/createPrefixer/createPrefixValue';

describe('createPrefixValue', () => {
  test('prefixes value', () => {
    const prefixValue = createPrefixValue(
      (prop, value) => value === '-ms-grid',
      prop => prop,
      ['Webkit', 'ms']
    );

    expect(prefixValue('display', 'grid')).toEqual('-ms-grid');
  });

  test('uses cache to prefix value', () => {
    const prefixValue = createPrefixValue(() => false, () => false, [], { 'displaygrid': '-ms-grid' });
    expect(prefixValue('display', 'grid')).toEqual('-ms-grid');
  });

  test('prefixes shorthand transition all', () => {
    const prefixValue = createPrefixValue(() => false, () => false, []);

    expect(prefixValue('transition', 'all .3s linear')).toEqual('all .3s linear');
  });

  test('prefixes shorthand transition value', () => {
    const prefixValue = createPrefixValue(
      (prop, value) => value === '-webkit-transform',
      prop => '-webkit-transform',
      []
    );

    expect(prefixValue('transition', 'transform 1s steps(3, start)')).toEqual('-webkit-transform 1s steps(3, start)');
  });

  test('prefixes transition-property all', () => {
    const prefixValue = createPrefixValue(() => false, () => false, []);

    expect(prefixValue('transition-property', 'all')).toEqual('all');
  });

  test('prefixes transition-property value', () => {
    const prefixValue = createPrefixValue(
      (prop, value) => value === '-webkit-transform',
      prop => '-webkit-transform',
      []
    );

    expect(prefixValue('transition-property', 'transform')).toEqual('-webkit-transform');
  });

  test('prefixes shorthand transitions value', () => {
    const prefixValue = createPrefixValue(
      (prop, value) => value.indexOf('transform') !== -1 ? value === '-webkit-transform' : true,
      prop => prop.indexOf('transform') !== -1 ? '-webkit-transform' : prop,
      []
    );

    expect(
      prefixValue('transition', 'background-color 1s linear,left .6s ease-out 1s,transform 1s steps(3, start)')
    ).toEqual('background-color 1s linear,left .6s ease-out 1s,-webkit-transform 1s steps(3, start)');
  });

  test('returns undefined when unable to prefixe shorthand transitions value', () => {
    const prefixValue = createPrefixValue(
      (prop, value) => value.indexOf('transform') !== -1 ? value === '-webkit-transform' : true,
      () => false,
      []
    );

    expect(
      prefixValue('transition', 'background-color 1s linear,left .6s ease-out 1s,transform 1s steps(3, start)')
    ).toEqual(void(0));
  });

  // test('valids dash-case prop', () => {
  //   const prefixprop = createPrefixProp(prop => prop === 'marginTop');
  //   expect(prefixprop('margin-top')).toEqual('margin-top');
  // });

  // test('caches prefixed prop', () => {
  //   const cache = {};
  //   const prefixprop = createPrefixProp(prop => prop === 'marginTop', [], cache);
  //   prefixprop('marginTop');
  //   expect(cache.marginTop).toEqual('margin-top');
  // });

  // test('return cached prop', () => {
  //   const cache = { marginTop: 'margin-top' };
  //   const prefixprop = createPrefixProp(prop => fakse, [], cache);
  //   expect(prefixprop('marginTop')).toEqual('margin-top');
  // });

  // test('skips prefixed prop', () => {
  //   const cache = {};
  //   const prefixprop = createPrefixProp(prop => prop === 'msGridRows', [], cache);
  //   expect(prefixprop('msGridRows')).toEqual('-ms-grid-rows');
  // });

  // test('prefix prop', () => {
  //   const prefixprop = createPrefixProp(prop => prop === 'WebkitAppearance', ['Webkit']);
  //   expect(prefixprop('appearance')).toEqual('-webkit-appearance');
  // });

  // test('prefix prop with re-try', () => {
  //   const prefixprop = createPrefixProp(prop => prop === 'msGridRows', ['Webkit', 'ms']);
  //   expect(prefixprop('gridRows')).toEqual('-ms-grid-rows');
  // });

  // test('returns undefined when not able to prefix', () => {
  //   const prefixprop = createPrefixProp(prop => false, ['Webkit', 'ms']);
  //   expect(prefixprop('test')).toEqual(void(0));
  // });

  // test('returns undefined when prefixed prop is not supported', () => {
  //   const prefixprop = createPrefixProp(prop => false, ['Webkit', 'ms']);
  //   expect(prefixprop('msGridRows')).toEqual(void(0));
  //   expect(prefixprop('ms-grid-rows')).toEqual(void(0));
  // });
});
