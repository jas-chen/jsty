export default function createClassNameGen() {
  let count = parseInt('9', 36); // we want first className to be `a`

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
