import cachedFn from '../utils/cachedFn';
import assignDecl from './assignDecl';

function assignSel(decl, sel) {
  if (!decl.sel) {
    decl.sel = sel;
  } else {
    decl.sel = decl.sel.replace(/&/g, sel);
  }
}

const sel = selectorText => function() {
  return assignDecl(arguments, selectorText, assignSel);
}

export default cachedFn(sel);
