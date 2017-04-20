import assignDecl from './assignDecl';

function assignMedia(decl, query) {
  decl.media = query;
}

export default query => {
  function media() {
    return assignDecl(arguments, query, assignMedia);
  }

  media.query = query;
  return media;
}
