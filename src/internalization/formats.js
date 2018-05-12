export function getShortDateFormat() {
  return 'D.M.YYYY';
}

export function getShortDateTimeFormat() {
  return 'D.M.YYYY HH:mm';
}

export function getShortTimeFormat() {
  return 'HH:mm';
}

export function formatYesNoText(value) {
  if (typeof value === 'string') {
    return value;
  }
  return value ? 'Yes' : 'No';
}
