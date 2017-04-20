export default function Keyframes(name, keyframes) {
  this.name = name;
  this.keyframes = keyframes;
}

Keyframes.prototype = {
  get type() {
    return '@keyframes';
  },
 	cssText() {
    let text = '';

    Object.keys(this.keyframes).forEach(key => {
      let cssText = '';

      const props = this.keyframes[key];
      Object.keys(props).forEach(prop => {
        cssText += `${prop}:${props[prop]}`;
      });

      text += `${key}{${cssText}}`;
    });

    return `@keyframes ${this.name}{${text}}`;
  }
}
