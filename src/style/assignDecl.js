export default function assignDecl(decls, value, assign) {
  const results = [];

  for (let i = 0 ; i < decls.length ; i += 1) {
    const decl = decls[i];
    for (let j = 0 ; j < decl.length ; j += 1) {
      const d = decl[j];
      assign(d, value);
      results.push(d);
    }
  }

  return results;
}
