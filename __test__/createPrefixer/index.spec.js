import createPrefixer from '../../src/createPrefixer';

describe('createPrefixer', () => {
  test('creates prefixer', () => {
    const prefixer = createPrefixer();
    expect(typeof prefixer.prefixDecl).toEqual('function');
    expect(typeof prefixer.prefixSel).toEqual('function');
  });
});
