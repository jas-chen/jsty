export default class ClassNameGen {
  constructor(lastClassName = '9') {
    this.count = parseInt(lastClassName, 36);
  }

  next() {
    this.count += 1;
    let className = this.count.toString(36);

    // className can't start with number
    if (className.charAt(0) !== '1') {
      return className;
    }

    className = 'a' + className.substr(1);
    this.count = parseInt(className, 36);
    return className;
  }
}
