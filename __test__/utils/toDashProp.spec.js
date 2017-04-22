import toDashProp from '../../src/utils/toDashProp';

describe('toDashProp', () => {
  test('Normal prop', () => {
    expect(toDashProp('margin')).toEqual('margin');
    expect(toDashProp('marginTop')).toEqual('margin-top');
    expect(toDashProp('borderTopLeftRadius')).toEqual('border-top-left-radius');
  });

  test('Prefixed prop', () => {
    expect(toDashProp('WebkitAppearance')).toEqual('-webkit-appearance');
    expect(toDashProp('msGridRows')).toEqual('-ms-grid-rows');
  });
});
