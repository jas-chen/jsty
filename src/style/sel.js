import cachedFn from '../utils/cachedFn';
import assignDecl from '../utils/assignDecl';

function assignSel(decl, sel) {
  if (!decl.sel) {
    decl.sel = sel;
  } else {
    decl.sel = decl.sel.replace(/&/g, sel);
  }
}

const createSel = sel => function() {
  if (process.env.NODE_ENV !== 'production') {
    if (sel.indexOf('&') === -1) {
      throw new Error('Selector must contain `&`, e.g. `&:hover`.');
    }
  }

  return assignDecl(arguments, sel, assignSel);
}

export default cachedFn(createSel);
