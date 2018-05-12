// import { isString } from 'lodash';
import { some, map, isFunction } from "lodash";
import globalMessages from "../internalization/global";

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  value === "" ||
  (isFunction(value.trim) && value.trim() === "");

export const join = rules => (value, data, props) => {
  const canHaveRequiredValidation = rules.some(
    rule => rule.isRequiredValidation
  );
  const valiationResult = rules
    .map(rule => rule(value, data, props))
    .filter(error => !!error)[0 /* first error */]; // eslint-disable-line

  if (valiationResult && canHaveRequiredValidation) {
    valiationResult.isRequired = true;
  }

  return valiationResult;
};

export function verifyDateValue(customDateVerifyMessage) {
  return (value, data, props) => {
    if (props.verifyFirstRegistrationValue) {
      return {
        descriptor: customDateVerifyMessage || globalMessages.dateVerify
      };
    }
  };
}

export function containsDigit(value) {
  if (!isEmpty(value) && !/[0-9]/.test(value)) {
    return { descriptor: globalMessages.valMustContainDigit };
  }
}

export function isPrefix(value) {
  if (!isEmpty(value) && !/^[0-9]{0,6}$/.test(value)) {
    return { descriptor: globalMessages.valPrefix };
  }
}

export function isAccountNumber(value) {
  if (!isEmpty(value) && !/^[0-9]{2,10}$/.test(value)) {
    return { descriptor: globalMessages.valAccountNumber };
  }
}

export function isBankCode(value) {
  if (!isEmpty(value) && !/^[0-9]{4}$/.test(value)) {
    return { descriptor: globalMessages.valBankCode };
  }
}

export function email(value) {
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return { descriptor: globalMessages.valFormatEmail };
  }
}

export function czTelephone(value) {
  if (
    !isEmpty(value) &&
    !/^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/i.test(value)
  ) {
    return { descriptor: globalMessages.valPhone };
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return { descriptor: globalMessages.valRequired, isRequired: true };
  }
}
required.isRequiredValidation = true;

export function accountNumberRequired(value) {
  if (isEmpty(value)) {
    return { descriptor: globalMessages.valAccountNumberRequired };
  }
}

export function bankCodeRequired(value) {
  if (isEmpty(value)) {
    return { descriptor: globalMessages.valBankCodeRequired };
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return {
        descriptor: globalMessages.valMinLength,
        values: { minLength: min.toString() }
      };
    }
  };
}

export function exactLength(exactValue) {
  return value => {
    if (!isEmpty(value) && value.length !== exactValue) {
      return {
        descriptor: globalMessages.valExactLength,
        values: { exactLength: exactValue.toString() }
      };
    }
  };
}

export function maxLength(max, messageDescriptor) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return {
        descriptor: messageDescriptor || globalMessages.valMaxLength,
        values: { maxLength: max.toString() }
      };
    }
  };
}

export function integer(messageDescriptor) {
  return value => {
    if (!Number.isInteger(Number(value)) && !isEmpty(value)) {
      return {
        descriptor: messageDescriptor || globalMessages.valMustBeInteger
      };
    }
  };
}

export function regExp(regExpression, messageDescriptor) {
  return value => {
    if (!regExpression.test(value)) {
      return { descriptor: messageDescriptor };
    }
  };
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      // eslint-disable-line
      return {
        descriptor: globalMessages.valMustBeOneOf,
        values: { enumeration: enumeration.join(", ") }
      };
    }
  };
}

export function match(field, messageDescriptor) {
  return (value, data) => {
    if (data) {
      if (value !== data.get(field)) {
        return messageDescriptor;
      }
    }
  };
}

export function when(condition, rule) {
  return (value, data, props) => {
    if (condition(value, data, props)) {
      return rule(value, data, props);
    }
  };
}

export function atLeastOneFilled(fields, data) {
  return some(fields, field => !isEmpty(data.get(field)));
}

export function createValidator(rules) {
  return (data, props = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key]));
      const error = rule(!data ? null : data.get(key), data, props);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function createListValidator(rules) {
  return (data = {}, props = {}) => {
    const errors = map(data, dataRow => {
      const rowErrors = {};
      Object.keys(rules).forEach(key => {
        const rule = join([].concat(rules[key]));
        const error = rule(dataRow[key], dataRow, props);
        if (error) {
          rowErrors[key] = error;
        }
      });
      return rowErrors;
    });

    return errors;
  };
}
