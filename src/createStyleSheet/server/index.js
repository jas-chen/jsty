export default function createServerSheet(mediaQueries = ['all']) {
  if (mediaQueries[0] !== 'all') {
    throw new Error(`Expected the first item of \`mediaQueries\` to be \`all\`.`);
  }

  const styleTags = {};

  mediaQueries.forEach(media => {
    if (typeof media !== 'string') {
      throw new Error(`Expected media to be string.`);
    }

    styleTags[media] = '';
  });

  function insertAtRule(rule) {
    styleTags['all'] = rule + styleTags['all'];
    return true;
  }

  function insertRule(rule, media = 'all') {
    styleTags[media] = styleTags[media] + rule;
    return true;
  }

  function getStyleTags(className = 'jsty-style') {
    return mediaQueries
      .map(media => {
        return `<style class="${className}" media="${media}">${styleTags[media]}</style>`;
      })
      .join('');
  }

  return {
    insertAtRule,
    insertRule,
    getStyleTags
  };
}
