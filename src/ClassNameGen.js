export default class ClassNameGen {
  constructor() {
    this.count = parseInt('9', 36);
  }

  next() {
    this.count += 1;
    let className = this.count.toString(36);

    if (className.charAt(0) !== '1') {
      return className;
    }

    className = 'a' + className.substr(1);
    this.count = parseInt(className, 36);
    return className;
  }
}
