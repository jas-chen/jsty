import createStyleSheet from '../../src/createStyleSheet';

describe('createStyleSheet', () => {
  test('creates styleSheet', () => {
    const styleSheet = createStyleSheet();
    expect(styleSheet.insertAtRule('')).toEqual(false);
    expect(styleSheet.insertStyleRule('')).toEqual(false);
  });

  test('creates styleSheet with media query', () => {
    const styleSheet = createStyleSheet(['all', '@media (max-width:200px)']);
    expect(styleSheet.insertAtRule('')).toEqual(false);
    expect(styleSheet.insertStyleRule('')).toEqual(false);
  });

  test('throws when order of media is not correct', () => {
    expect(() => createStyleSheet(['@media (max-width:200px)', 'all'])).toThrow();
  });

  test('throws when media is not string', () => {
    expect(() => createStyleSheet(['all', () => {}])).toThrow();
  });
});
