import moment from 'moment';
import _ from 'lodash';
import {Map} from 'immutable';

require('moment/locale/en-gb'); // eslint-disable-line

moment.locale();

export function getMoment(initial) {
  if (initial) {
    return moment(initial);
  }
  return moment();
}

export function getTodayMoment() {
  return moment().startOf('day');
}

export function convertMomentMapKeysToString(immutableMap) {
  if (!immutableMap) {
    return immutableMap;
  }
  if (!Map.isMap(immutableMap)) {
    throw new Error('Parameter "map" must be of ImmutableJS.Map type');
  }

  return immutableMap.map(val => moment.isMoment(val) ? val.format() : val); // eslint-disable-line
}

export function deepConvertStringMapKeysToMoment(immutableMap) {
  if (!immutableMap) {
    return immutableMap;
  }
  if (!Map.isMap(immutableMap)) {
    throw new Error('Parameter "map" must be of ImmutableJS.Map type');
  }

  return _helperDeepStringToMomentConvert(immutableMap);
}

export function deepConvertMomentMapKeysToString(immutableMap) {
  if (!immutableMap) {
    return immutableMap;
  }
  if (!Map.isMap(immutableMap)) {
    throw new Error('Parameter "map" must be of ImmutableJS.Map type');
  }

  return _helperDeepMomentConvert(immutableMap);
}

function _helperDeepMomentConvert(immutableMap) {
  return immutableMap.map(val => {
    if (Map.isMap(val)) {
      return _helperDeepMomentConvert(val);
    }
    return moment.isMoment(val) ? val.format() : val;
  });
}

function _helperDeepStringToMomentConvert(immutableMap) {
  return immutableMap.map(val => {
    if (Map.isMap(val)) {
      return _helperDeepStringToMomentConvert(val);
    }
    return _.isString(val) && val.indexOf('T') >= 0 && val.indexOf('-') >= 0 && val.indexOf(':') >= 0 ? moment(val) : val;
  });
}
