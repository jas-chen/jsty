export default function Keyframes(name, keyframes) {
  this.name = name;
  this.keyframes = keyframes;
}

Keyframes.prototype = {
  toString() {
    return this.name;
  },
 	cssText() {
    let text = '';

    Object.keys(this.keyframes).forEach(key => {
      let cssText = '';

      this.keyframes[key].forEach(decl => {
        cssText += `${decl.prop}:${decl.value}`;
      });

      text += `${key}{${cssText}}`;
    });

    return `@keyframes ${this.name}{${text}}`;
  }
}
