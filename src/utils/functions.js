import { isString } from 'lodash';
import jQuery from 'jquery';

export function getObjectValueDeep(object, valuePath) {
  if (!object) {
    throw new Error('"object" parameter is required');
  }
  if (!valuePath) {
    return null;
  }

  return valuePath.split('.').reduce((o, i) => o === undefined || !(i in o) ? undefined : o[i], object);
}

export function flattenObject(ob) {
  /* eslint-disable */
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
  /* eslint-enable */
}

export function getErrorMessage(error) {
  if (error) {
    if (isString(error)) {
      return error;
    }
    if (error.message && error.status) {
      return `${error.status} - ${error.message}`;
    }
    if (error.message) {
      return error.message;
    }
    if (error.error) {
      return error.error;
    }
    if (error.reason) {
      return `${error.error} - ${error.reason}`;
    }

    return JSON.stringify(error);
  }
  return 'Unknown error';
}

export function goToFirstInvalidTab() {
  setTimeout(() => {
    const tabList = jQuery('.ant-tabs');

    if (tabList) {
      const invalidTabs = tabList.find('.anticon-close-circle')[0].closest('.ant-tabs-tab');

      if (invalidTabs) {
        invalidTabs.click();
      }
    }
  }, 500);
}
