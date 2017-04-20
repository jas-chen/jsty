export default function createStyleElement(media) {
  const element = document.createElement('style');
  element.media = media;

  // WebKit hack
  // https://davidwalsh.name/add-rules-stylesheets
  element.appendChild(document.createTextNode(''));
  document.head.appendChild(element);

  return element;
}
