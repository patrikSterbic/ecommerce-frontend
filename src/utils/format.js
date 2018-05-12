export function uppercaseFirstLetter(value) {
  if (value) {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }
  return value;
}
export function upperCaseLetters(value) {
  if (value) {
   return value.toUpperCase();
  }
  return value;
}

export function addSlashToBirthNumber(birthNumber) {
  if (!birthNumber || birthNumber.length < 7 || birthNumber.indexOf('/') >= 0) {
    return birthNumber;
  }

  return `${birthNumber.slice(0, 6)}/${birthNumber.slice(6)}`;
}
export function disallowSpaces(value) {
  if (value) {
    return value.trim();
  }
  return value;
}
