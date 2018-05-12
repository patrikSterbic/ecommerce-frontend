import React from "react";
import { Input, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";
import { isFunction, each } from "lodash";

const FormItem = Form.Item;
const InputGroup = Input.Group;

const SUCCESS_MESSAGE_OBJECT = {};

class CustomFormField extends React.Component {
  getValidLevel(valid, warning) {
    if (warning) {
      return "warning";
    }
    return valid ? "success" : "error";
  }

  getHelpMessageObject(error, warning) {
    if (warning) {
      return warning;
    }
    if (error) {
      return error;
    }
    return SUCCESS_MESSAGE_OBJECT;
  }

  _getGroupedValidLevel(groupedInputData) {
    let isValidating, hasError, hasSuccess, hasWarning;
    each(groupedInputData, data => {
      const meta = data.meta;
      const input = data.input;
      if (meta.touched) {
        if (meta.asyncValidating || meta.submitting) {
          if (!isValidating) {
            isValidating = true;
          }
        } else {
          if (meta.warning) {
            if (!hasWarning) {
              hasWarning = true;
            }
          } else {
            if (!meta.valid) {
              if (!hasError) {
                hasError = true;
              }
            } else {
              if (!hasSuccess) {
                hasSuccess = true;
              }
            }
          }
        }
      } else {
        const initialValidation = getInitialValidation(input, meta);
        if ("success" === initialValidation) {
          if (!hasSuccess) {
            hasSuccess = true;
          }
        }
      }
    });
    if (isValidating) {
      return "is-grouped-validating";
    }
    if (hasError) {
      return "has-grouped-error";
    }
    if (hasWarning) {
      return "has-grouped-warning";
    }
    if (hasSuccess) {
      return "has-grouped-success";
    }
  }

  render() {
    const {
      /* Input */
      placeholder,
      addonBefore,
      addonAfter,
      type,
      maxLength,
      prefix,
      suffix,
      onPressEnter,
      disabled,
      readOnly,
      size,
      rows,
      onCustomChange,
      onCustomBlur,
      style,
      customNormalize,
      validationTooltipEnabled,
      validationTooltipClassName,
      tabIndex,
      isGrouped,
      groupedInputData,
      defaultInitialValue,

      /* FormItem */
      label,
      labelCol,
      wrapperCol,
      extra,
      required,
      hasFeedback,
      colon,

      /* Tooltip */
      useStandardErrorMsg,
      tooltipPlacement,

      /* Internationalization */
      formatMessage,

      /* redux form */
      meta,
      input,

      /* others */
      className
    } = this.props;

    const {
      error,
      asyncValidating,
      submitting,
      valid,
      warning,
      touched,
      active
    } = meta ? meta : {};
    const { text, descriptor, values } = this.getHelpMessageObject(
      error,
      warning
    );
    const errorMsg =
      meta &&
      touched &&
      (text
        ? text
        : descriptor
          ? formatMessage(descriptor, values)
          : error || "");
    const isRequired = error && error.isRequired; // Hack pro automatické zjištění, zda je required

    return (
      <FormItem
        style={style}
        label={label ? label : <div className="ant-form-item-label" />}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        help={useStandardErrorMsg && errorMsg}
        extra={extra}
        required={required}
        validateStatus={
          meta
            ? touched
              ? asyncValidating || submitting
                ? "validating"
                : this.getValidLevel(valid, warning)
              : getInitialValidation(input, meta, defaultInitialValue)
            : ""
        }
        hasFeedback={disabled || readOnly ? false : hasFeedback}
        colon={colon}
        className={`${isGrouped ? `grouped-feedback` : ""} ${
          isGrouped && groupedInputData
            ? this._getGroupedValidLevel(groupedInputData)
            : ""
        } ${addonAfter ? "has-right-addon" : ""} ${
          suffix ? "has-suffix" : ""
        } ${isRequired ? "is-required" : ""}`}
      >
        {renderTooltip(
          <Input
            placeholder={placeholder}
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            size={size}
            type={type}
            prefix={prefix}
            suffix={suffix}
            onPressEnter={onPressEnter}
            disabled={disabled}
            readOnly={readOnly}
            className={className}
            maxLength={maxLength}
            tabIndex={tabIndex}
            rows={rows}
            {...input}
            onChange={event => {
              const normalizedValue = isFunction(customNormalize)
                ? customNormalize(event.target.value)
                : event;

              input.onChange(normalizedValue, event);

              if (onCustomChange) {
                onCustomChange(normalizedValue, event);
              }
            }}
            onBlur={event => {
              input.onBlur(event);

              if (onCustomBlur) {
                onCustomBlur(input.value);
              }
            }}
          />,
          useStandardErrorMsg,
          errorMsg,
          {
            active: errorMsg && active,
            validationTooltipEnabled,
            warning,
            tooltipClassName: validationTooltipClassName,
            placement: tooltipPlacement
          }
        )}
      </FormItem>
    );
  }
}

CustomFormField.defaultProps = {
  size: "large",
  type: "text",
  disabled: false,
  readOnly: false,
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false,
  isGrouped: false,
  tabIndex: null,
  defaultInitialValue: ""
};

export default CustomFormField;
export { InputGroup };
