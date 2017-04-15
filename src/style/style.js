export default function style() {
  const decls = [];

  for (let i = 0 ; i < arguments.length ; i += 1) {
    const decl = arguments[i];
    if (Array.isArray(decl)) {
      Array.prototype.push.apply(decls, decl);
    } else {
      decls.push(decl);
    }
  }

  return decls;
}
