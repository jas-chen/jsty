import cachedFn from '../utils/cachedFn';
import assignDecl from './assignDecl';

function assignSel(decl, sel) {
  if (!decl.sel) {
    decl.sel = sel;
  } else {
    decl.sel = sel + decl.sel;
  }
}

const sel = selectorText => function() {
  return assignDecl(arguments, selectorText, assignSel);
}

export default cachedFn(sel);
