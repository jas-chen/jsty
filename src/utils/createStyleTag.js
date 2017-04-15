export default function createStyleTag(media) {
  const styleTag = document.createElement('style');
  if (media) {
    styleTag.setAttribute('media', media);
  }

  // WebKit hack
  // https://davidwalsh.name/add-rules-stylesheets
  styleTag.appendChild(document.createTextNode(''));
  document.head.appendChild(styleTag);

  return styleTag;
}
