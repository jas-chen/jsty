import Keyframes from '../../src/style/Keyframes';

describe('Keyframes', () => {
  const spinner = new Keyframes('spinner', {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  });

  test('declares keyframes', () => {
    expect(spinner.type).toEqual('@keyframes');
    expect(spinner.name).toEqual('spinner');
    expect(spinner.cssText()).toEqual('@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}');
  });
});
