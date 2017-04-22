import {
  Keyframes,
  media,
  d,
  createInsertStyle,
  createStyleSheet,
  createPrefixer
} from '../src';

describe('imports every thing', () => {
  test('works', () => {
    expect(typeof Keyframes).not.toEqual('undefined');
    expect(typeof media).not.toEqual('undefined');
    expect(typeof d).not.toEqual('undefined');
    expect(typeof createInsertStyle).not.toEqual('undefined');
    expect(typeof createStyleSheet).not.toEqual('undefined');
    expect(typeof createPrefixer).not.toEqual('undefined');
  });
});
