import d from '../../src/style/d';

describe('d', () => {
  test('declares css declaration', () => {
    expect(d({ color: 'red' })).toEqual([{ prop: 'color', value: 'red' }]);

    expect(d({ color: 'red', marginTop: '10px' })).toEqual([
      { prop: 'color', value: 'red' },
      { prop: 'marginTop', value: '10px' }
    ]);
  });

  test('declares css declaration with selectors', () => {
    expect(
      d(':hover')(
        d({ color: 'red', marginTop: '10px' })
      )
    ).toEqual([
      { sel: ':hover', prop: 'color', value: 'red' },
      { sel: ':hover', prop: 'marginTop', value: '10px' }
    ]);
  });

  test('declares css declaration with nested selectors', () => {
    expect(
      d(':checked')(
        d(':hover')(
          d({ color: 'red', marginTop: '10px' })
        )
      )
    ).toEqual([
      { sel: ':checked:hover', prop: 'color', value: 'red' },
      { sel: ':checked:hover', prop: 'marginTop', value: '10px' }
    ]);

    expect(
      d(':checked')(
        d(':hover')(
          d({ color: 'red', marginTop: '10px' })
        ),
        d('::after')(
          d({ color: 'red', marginTop: '10px' })
        )
      )
    ).toEqual([
      { sel: ':checked:hover', prop: 'color', value: 'red' },
      { sel: ':checked:hover', prop: 'marginTop', value: '10px' },
      { sel: ':checked::after', prop: 'color', value: 'red' },
      { sel: ':checked::after', prop: 'marginTop', value: '10px' }
    ]);
  });

  test('throws when params are not correct', () => {
    expect(() => d()).toThrow();
    expect(() => d(':hover', d({ color: 'red', marginTop: '10px' }))).toThrow();
  });
});
