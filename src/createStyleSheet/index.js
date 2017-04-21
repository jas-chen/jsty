import createStyleElement from '../utils/createStyleElement';

export default function createStyleSheet(mediaQueries = ['all']) {
  if (mediaQueries[0] !== 'all') {
    throw new Error(`Expected the first item of \`mediaQueries\` to be \`all\`.`);
  }

  const styleElements = {};

  mediaQueries.forEach(media => {
    if (typeof media !== 'string') {
      throw new Error(`Expected media to be string.`);
    }

    styleElements[media] = createStyleElement(media);
  });

  function insertAtRule(rule) {
    try {
      styleElements['all'].sheet.insertRule(rule, 0);
      return true;
    } catch(e) {
      return false;
    }
  }

  function insertStyleRule(rule, media) {
    const { sheet } = styleElements[media || 'all'];

    try {
      sheet.insertRule(rule, sheet.cssRules.length);
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    insertAtRule,
    insertStyleRule
  };
}
