export default function createServerSheet(opts = {}) {
  const {
    sheets = {},
    onInsert
  } = opts;

  function insert(media, sel, rule) {
    const isAtRule = sel.length && sel.charAt(0) === '@';

    onInsert && onInsert(media, sel, rule);

    if (sheets.hasOwnProperty(media)) {
      if (isAtRule) {
        sheets[media] = `${sel}${sheets[media]}`;
      } else {
        sheets[media] += `${sel}{${rule}}`;
      }
    } else {
      if (isAtRule) {
        sheets[media] = `${sel}`;
      } else {
        sheets[media] = `${sel}{${rule}}`;
      }
    }
  }

  return {
    insert,
    sheets
  };
}
