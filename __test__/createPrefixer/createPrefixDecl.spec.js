import createPrefixDecl from '../../src/createPrefixer/createPrefixDecl';

describe('createPrefixDecl', () => {
  test('prefixes normal decl', () => {
    const prefixDecl = createPrefixDecl(() => true);
    expect(prefixDecl('marginTop', '10px')).toEqual('margin-top:10px');
    expect(prefixDecl('margin-top', '10px')).toEqual('margin-top:10px');
  });

  test('prefixes decl', () => {
    const prefixDecl = createPrefixDecl(prop => prop === '-webkit-appearance', prop => prop === 'WebkitAppearance', ['Webkit']);
    expect(prefixDecl('appearance', 'none')).toEqual('-webkit-appearance:none');
  });

  test('returns undefined when unable to prefix', () => {
    const prefixDecl = createPrefixDecl(prop => false, prop => prop === 'WebkitAppearance', ['Webkit']);
    expect(prefixDecl('appearance', 'none')).toEqual(void(0));
  });
});
