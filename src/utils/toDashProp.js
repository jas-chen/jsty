const uppercasePattern = /[A-Z]/g;
const toHyphenLower = match => '-' + match.toLowerCase();
const isMsPattern = name => name.charAt(0) === 'm' && name.charAt(1) === 's' && name.charAt(2) === '-';

export default function toDashProp(name) {
    name = name.replace(uppercasePattern, toHyphenLower);
    return isMsPattern(name) ? '-' + name : name;
}
