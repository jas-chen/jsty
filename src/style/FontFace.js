export default function FontFace(style) {
  this.style = style;
}

FontFace.prototype = {
  toString() {
    return this.style['font-family'];
  },
 	cssText() {
    let text = '';

    const props = Object.keys(style);
    for (let i = 0 ; i < props.length ; i += 1) {
      text += `${prop}:${style[props[i]]};`;
    }

    return `@font-face{${text}}`;
  }
}