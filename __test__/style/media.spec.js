import d from '../../src/style/d';
import media from '../../src/style/media';

describe('media', () => {
  test('Declare css declaration with media', () => {
    expect(
      media('(max-width:400px)')(
        d({ color: 'red', marginTop: '10px' })
      )
    ).toEqual([
      { media: '(max-width:400px)', prop: 'color', value: 'red' },
      { media: '(max-width:400px)', prop: 'marginTop', value: '10px' }
    ]);
  });

  test('stores media query as property', () => {
    expect(media('(max-width:400px)').query).toEqual('(max-width:400px)');
  });
});
