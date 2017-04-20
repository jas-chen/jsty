import sel from './sel';

export default function(declOrSel) {
  if (process.env.NODE_ENV !== 'production') {
    if (arguments.length !== 1) {
      throw new Error(`Expected \`d()\` to receive 1 argument.`);
    }
  }

  if (typeof declOrSel === 'string') { // sel
    return sel(declOrSel);
  } else { // decl
    const props = Object.keys(declOrSel);
    for (let i = 0 ; i < props.length ; i += 1) {
      const prop = props[i];
      props[i] = { prop, value: declOrSel[prop] }
    }

    return props;
  }
}
