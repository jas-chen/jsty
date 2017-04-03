export default function createServerSheet() {
  const sheets = {};

  function insert(media, sel, rule) {
    const value = `${sel}\t{\t${rule}}\n`;
    if (sheets.hasOwnProperty(media)) {
      sheets[media] += value;
    } else {
      sheets[media] = value;
    }
  }

  return {
    insert,
    sheets
  };
}
