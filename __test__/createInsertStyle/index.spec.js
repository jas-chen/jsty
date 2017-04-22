import createInsertStyle from '../../src/createInsertStyle';

describe('createInsertStyle', () => {
  test('inserts decl', () => {
    const onStyleRule = jest.fn();
    const insertStyle = createInsertStyle({ onStyleRule });

    expect(insertStyle([
      { prop: 'color', value: 'red' },
      { media: '(width:200px)', prop: 'top', value: '0' }
    ])).toEqual('a_ b_');

    expect(onStyleRule.mock.calls.length).toEqual(2);
    expect(onStyleRule.mock.calls[0][0]).toEqual('all');
    expect(onStyleRule.mock.calls[0][1]).toEqual('.a_');
    expect(onStyleRule.mock.calls[0][2]).toEqual('color');
    expect(onStyleRule.mock.calls[0][3]).toEqual('red');
    expect(onStyleRule.mock.calls[1][0]).toEqual('(width:200px)');
    expect(onStyleRule.mock.calls[1][1]).toEqual('.b_');
    expect(onStyleRule.mock.calls[1][2]).toEqual('top');
    expect(onStyleRule.mock.calls[1][3]).toEqual('0');
  });

  test('inserts duplucated decl only trigger onStyleRule() once', () => {
    const onStyleRule = jest.fn();
    const insertStyle = createInsertStyle({ onStyleRule });

    expect(insertStyle([{ prop: 'color', value: 'red' }])).toEqual('a_');
    expect(insertStyle([{ prop: 'color', value: 'red' }])).toEqual('a_');
    expect(onStyleRule.mock.calls.length).toEqual(1);
    expect(onStyleRule.mock.calls[0][0]).toEqual('all');
    expect(onStyleRule.mock.calls[0][1]).toEqual('.a_');
    expect(onStyleRule.mock.calls[0][2]).toEqual('color');
    expect(onStyleRule.mock.calls[0][3]).toEqual('red');
  });

  test('inserts decls', () => {
    const onStyleRule = jest.fn();
    const insertStyle = createInsertStyle({ onStyleRule });
    const d1 = { prop: 'color', value: 'red' };
    const d2 = { prop: 'margin', value: '10px' };
    const decls = [d1, d2];
    expect(insertStyle(decls)).toEqual('a_ b_');
    expect(onStyleRule.mock.calls.length).toEqual(2);
    expect(onStyleRule.mock.calls.length).toEqual(2);
    expect(onStyleRule.mock.calls[0][0]).toEqual('all');
    expect(onStyleRule.mock.calls[0][1]).toEqual('.a_');
    expect(onStyleRule.mock.calls[0][2]).toEqual('color');
    expect(onStyleRule.mock.calls[0][3]).toEqual('red');
    expect(onStyleRule.mock.calls[1][0]).toEqual('all');
    expect(onStyleRule.mock.calls[1][1]).toEqual('.b_');
    expect(onStyleRule.mock.calls[1][2]).toEqual('margin');
    expect(onStyleRule.mock.calls[1][3]).toEqual('10px');

    // cache set
    expect(d1.className).toEqual('a_');
    expect(d2.className).toEqual('b_');
    expect(decls.className).toEqual('a_ b_');
  });

  test('inserts @keyframes', () => {
    const spinner = {
      type: '@keyframes',
      name: 'spinner',
      cssText: () => '@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}'
    };

    const onStyleRule = jest.fn();
    const onAtRule = jest.fn();
    const insertStyle = createInsertStyle({ onAtRule, onStyleRule });

    expect(insertStyle([{ prop: 'animation-name', value: spinner }])).toEqual('a_');
    expect(onAtRule.mock.calls.length).toEqual(1);
    expect(onAtRule.mock.calls[0][0]).toEqual('@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}');
    expect(onStyleRule.mock.calls.length).toEqual(1);
    expect(onStyleRule.mock.calls[0][0]).toEqual('all');
    expect(onStyleRule.mock.calls[0][1]).toEqual('.a_');
    expect(onStyleRule.mock.calls[0][2]).toEqual('animation-name');
    expect(onStyleRule.mock.calls[0][3]).toEqual('spinner');
  });

  test('inserts duplucated @keyframes', () => {
    const spinner = {
      type: '@keyframes',
      name: 'spinner',
      cssText: () => '@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}'
    };

    const onStyleRule = jest.fn();
    const onAtRule = jest.fn();
    const insertStyle = createInsertStyle({ onAtRule, onStyleRule });
    const decls = [
      { sel: ':hover', prop: 'animation-name', value: spinner },
      { sel: ':checked', prop: 'animation-name', value: spinner }
    ];

    expect(insertStyle(decls)).toEqual('a_ b_');
    expect(insertStyle(decls)).toEqual('a_ b_');
    expect(onAtRule.mock.calls.length).toEqual(1);
    expect(onAtRule.mock.calls[0][0]).toEqual('@keyframes spinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}');
    expect(onStyleRule.mock.calls.length).toEqual(2);
    expect(onStyleRule.mock.calls[0][0]).toEqual('all');
    expect(onStyleRule.mock.calls[0][1]).toEqual('.a_:hover');
    expect(onStyleRule.mock.calls[0][2]).toEqual('animation-name');
    expect(onStyleRule.mock.calls[0][3]).toEqual('spinner');
    expect(onStyleRule.mock.calls[1][0]).toEqual('all');
    expect(onStyleRule.mock.calls[1][1]).toEqual('.b_:checked');
    expect(onStyleRule.mock.calls[1][2]).toEqual('animation-name');
    expect(onStyleRule.mock.calls[1][3]).toEqual('spinner');
  });

  test('never creates a non-valid class name', () => {
    const classNames = jest.fn();
    const insertStyle = createInsertStyle({ onStyleRule: () => {} });
    for (let i = 0 ; i < 30 ; i += 1) {
      classNames(insertStyle([{ prop: 'margin', value: `${i}px` }]));
    }

    expect(classNames.mock.calls.every(([className]) => (/^[a-z]/).test(className))).toEqual(true);
  });

  test('uses cached class name', () => {
    const insertStyle = createInsertStyle({ onStyleRule: () => {} });
    expect(insertStyle([{ className: 'foo' }, { className: 'bar' }])).toEqual('foo bar');
  });
});
