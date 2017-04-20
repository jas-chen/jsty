import createStyleElement from '../utils/createStyleElement';

export default function createStyleSheet(mediaQueries = ['all']) {
  if (mediaQueries[0] !== 'all') {
    throw new Error(`Expected the first item of \`mediaQueries\` to be \`all\`.`);
  }

  const styleElements = {};

  mediaQueries.forEach(query => {
    if (typeof query !== 'string') {
      throw new Error(`Expected query to be string.`);
    }

    styleElements[query] = createStyleElement(query);
  });

  function insertAtRule(rule) {
    try {
      styleElements['all'].sheet.insertRule(rule, 0);
      return true;
    } catch(e) {
      return false;
    }
  }

  function insertRule(rule, media) {
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
    insertRule
  };
}
