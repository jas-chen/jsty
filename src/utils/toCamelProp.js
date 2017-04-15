export default input => {
  const result = input.replace(/-\w/g, match => match.charAt(1).toUpperCase());
  if (input.charAt(0) === '-' && input.charAt(2) === 's') { // -ms-
    return 'm' + result.substr(1); // lower case the first char
  }

  return result;
};
