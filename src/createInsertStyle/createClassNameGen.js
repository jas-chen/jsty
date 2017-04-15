export default function createClassNameGen(lastClassName = '9') {
  let count = parseInt(lastClassName, 36);

  return function nextClassName() {
    count += 1;
    let className = count.toString(36);

    // ensure className not starting with number
    if (className.charAt(0) === '1') {
      className = 'a' + className.substr(1);
      count = parseInt(className, 36);
    }

    return className;
  }
}
