import cachedFn from '../../src/utils/cachedFn';

describe('cachedFn', () => {
  const fn = key => value => `${key}:${value}`;
  const cFn = cachedFn(fn);

  test('Caches fn', () => {
    expect(cFn('margin')).toEqual(cFn('margin'));
    expect(cFn('color')).toEqual(cFn('color'));
  });

  test('Cached fn workes', () => {
    expect(cFn('margin')('top')).toEqual('margin:top');
  });
});
