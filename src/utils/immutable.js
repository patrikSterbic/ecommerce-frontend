/**
 * Update of value in Map
 * Ex: temp1.updateIn(['data', 'clients'], whereListKeyIs('id', 2, (v) => v.set('removing', true)))
 * @param key
 * @param value
 * @param updater
 * @returns {function(*)}
 */
export function whereListKeyIs(key, value, updater) {
  return (list) => {
    const keyIndex = list.findIndex(item => item.get(key) === value);

    if (keyIndex < 0) {
      return list;
    }
    return list.update(keyIndex, updater);
  };
}

/**
 * Update of value in Map by parameters like id
 * Ex: temp1.updateIn(['data', 'clients'], whereListKeyIs('id', 2, (v) => v.set('removing', true)))
 * @param key
 * @param value
 * @param updater
 * @returns {function(*)}
 */
export function deleteWhereListKeyIs(key, value) {
  return (list) => {
    const keyIndex = list.findIndex(item => item.get(key) === value);

    if (keyIndex < 0) {
      return list;
    }
    return list.delete(keyIndex);
  };
}
