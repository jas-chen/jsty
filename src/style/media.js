import assignDecl from '../utils/assignDecl';

function assignMedia(decl, query) {
  decl.media = query;
}

export default query => function() {
  return assignDecl(arguments, query, assignMedia);
}
