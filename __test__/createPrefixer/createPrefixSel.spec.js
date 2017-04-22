import createPrefixSel from '../../src/createPrefixer/createPrefixSel';

describe('createPrefixSel', () => {
  test('prefixes normal selector', () => {
    const prefixSel = createPrefixSel();
    expect(prefixSel(':hover')).toEqual(':hover');
  });

  test('prefixes webkit ::placeholder', () => {
    const prefixSel = createPrefixSel(sel => sel.indexOf('webkit') !== -1 && '::-webkit-input-placeholder', false, ['Webkit']);
    expect(prefixSel('.a::placeholder')).toEqual('.a::-webkit-input-placeholder');
  });

  test('prefixes moz ::placeholder', () => {
    const prefixSel = createPrefixSel(sel => sel.indexOf('moz') !== -1 && '::-moz-placeholder', false, ['Moz']);
    expect(prefixSel('.a::placeholder')).toEqual('.a::-moz-placeholder');
  });

  test('prefixes ms ::placeholder', () => {
    const prefixSel = createPrefixSel(sel => sel === ':-ms-input-placeholder' ? ':-ms-input-placeholder' : void(0), false, ['Webkit', 'ms']);
    expect(prefixSel('.a::placeholder')).toEqual('.a:-ms-input-placeholder');
  });

  test('prefixes failed ::placeholder', () => {
    const prefixSel = createPrefixSel(sel => void(0), false, ['Webkit', 'ms']);
    expect(prefixSel('.a::placeholder')).toEqual(void(0));
  });

  test('uses cache to prefix ::placeholder - case 1', () => {
    const prefixSel = createPrefixSel(sel => void(0), false, [], { '::placeholder': ':whatever' });
    expect(prefixSel('.a::placeholder')).toEqual('.a:whatever');
  });

  test('uses cache to prefix ::placeholder - case 2', () => {
    const prefixSel = createPrefixSel(sel => void(0), false, [], { '::placeholder': void(0) });
    expect(prefixSel('.a::placeholder')).toEqual(void(0));
  });


  test('prefixes supported ::selection', () => {
    const prefixSel = createPrefixSel(sel => sel === '::selection', false, []);
    expect(prefixSel('.a::selection')).toEqual('.a::selection');
  });

  test('prefixes moz ::selection', () => {
    const prefixSel = createPrefixSel(sel => sel === '::-moz-selection', true, []);
    expect(prefixSel('.a::selection')).toEqual('.a::-moz-selection');
  });

  test('returns undefined when unable to prefix ::selection', () => {
    const prefixSel = createPrefixSel(sel => false, false, []);
    expect(prefixSel('.a::selection')).toEqual(void(0));
  });

  test('uses cache to prefix ::selection - case 1', () => {
    const prefixSel = createPrefixSel(sel => false, false, [], { '::selection': ':whatever' });
    expect(prefixSel('.a::selection')).toEqual('.a:whatever');
  });

  test('uses cache to prefix ::selection - case 2', () => {
    const prefixSel = createPrefixSel(sel => false, false, [], { '::selection': void(0) });
    expect(prefixSel('.a::selection')).toEqual(void(0));
  });


  test('prefixes supported :fullscreen', () => {
    const prefixSel = createPrefixSel(sel => sel === ':fullscreen', false, []);
    expect(prefixSel('.a:fullscreen')).toEqual('.a:fullscreen');
  });

  test('prefixes Webkit :fullscreen', () => {
    const prefixSel = createPrefixSel(sel => sel === ':-webkit-full-screen', false, ['Webkit']);
    expect(prefixSel('.a:fullscreen')).toEqual('.a:-webkit-full-screen');
  });

  test('prefixes ms :fullscreen', () => {
    const prefixSel = createPrefixSel(sel => sel === ':-ms-fullscreen', false, ['Webkit', 'ms']);
    expect(prefixSel('.a:fullscreen')).toEqual('.a:-ms-fullscreen');
  });

  test('prefixes Moz :fullscreen', () => {
    const prefixSel = createPrefixSel(sel => sel === ':-moz-full-screen', true, ['Moz']);
    expect(prefixSel('.a:fullscreen')).toEqual('.a:-moz-full-screen');
  });

  test('returns undefined when unable to prefix :fullscreen', () => {
    const prefixSel = createPrefixSel(sel => false, false, []);
    expect(prefixSel('.a:fullscreen')).toEqual(void(0));
  });

  test('uses cache to prefix :fullscreen - case 1', () => {
    const prefixSel = createPrefixSel(sel => false, false, [], { ':fullscreen': ':whatever' });
    expect(prefixSel('.a:fullscreen')).toEqual('.a:whatever');
  });

  test('uses cache to prefix :fullscreen - case 2', () => {
    const prefixSel = createPrefixSel(sel => false, false, [], { ':fullscreen': void(0) });
    expect(prefixSel('.a:fullscreen')).toEqual(void(0));
  });

  test('prefixes every sel - case 1', () => {
    const prefixSel = createPrefixSel(sel => sel, false, ['Webkit']);
    expect(prefixSel('.a:fullscreen::selection::placeholder')).toEqual('.a:fullscreen::selection::placeholder');
  });

  test('prefixes every sel - case 2', () => {
    const prefixSel = createPrefixSel(sel => {
      if (!(/(-webkit-|::selection)/).test(sel)) {
        return false;
      }

      return sel;
    }, false, ['Webkit']);
    expect(prefixSel('.a:fullscreen::selection::placeholder')).toEqual('.a:-webkit-full-screen::selection::-webkit-input-placeholder');
  });
});
