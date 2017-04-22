import createIsValid from '../../src/createPrefixer/createIsValid';

describe('createIsValid', () => {
  const isValid = createIsValid();

  test('valids prop', () => {
    expect(isValid.prop('margin')).toEqual(true);
  });

  test('valids declaration', () => {
    expect(isValid.decl('margin', 'top3')).toEqual(false);
  });

  test('throws when pass camelProp', () => {
    expect(() => isValid.decl('marginTop', '10px')).toThrow();
  });

  test('valids selector', () => {
    expect(isValid.sel('asd')).toEqual(false);
  });
});
