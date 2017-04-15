export default function createServerSheet(opts = {}) {
  const {
    styleSheets = {}
  } = opts;

  function insertAtRule(rule) {
    if (styleSheets.hasOwnProperty('all')) {
      styleSheets['all'] = `${rule}${styleSheets['all']}`;
    } else {
      styleSheets['all'] = rule;
    }
  }

  function insertRule(media, sel, rule) {
    if (styleSheets.hasOwnProperty(media)) {
      styleSheets[media] += `${sel}{${rule}}`;
    } else {
      styleSheets[media] = `${sel}{${rule}}`;
    }
  }

  return {
    insertAtRule,
    insertRule,
    styleSheets
  };
}
