import React from "react";
import { Checkbox, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const CustomFormCheckboxGroup = ({
  /* CheckboxGroup */
  options,
  onCustomChange,

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
  input
}) => {
  const { error, asyncValidating, submitting, valid, touched } = meta
    ? meta
    : {};
  const { text, descriptor, values } = error ? error : {};
  const errorMsg =
    meta &&
    touched &&
    (text
      ? text
      : descriptor
        ? formatMessage(descriptor, values)
        : error || "");

  return (
    <FormItem
      label={label}
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
              : valid
                ? "success"
                : "error"
            : getInitialValidation(input, meta)
          : ""
      }
      hasFeedback={hasFeedback}
      colon={colon}
      className={`${hasFeedback ? "uikit-checkbox-group" : null}`}
    >
      {renderTooltip(
        <CheckboxGroup
          onChange={value => {
            input.onFocus();
            input.onChange(value);
            input.onBlur();

            if (onCustomChange) {
              onCustomChange(value);
            }
          }}
          value={input && input.value ? input.value : []}
          options={options}
        />,
        useStandardErrorMsg,
        errorMsg,
        { placement: tooltipPlacement }
      )}
    </FormItem>
  );
};

CustomFormCheckboxGroup.defaultProps = {
  options: [],
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false
};

export default CustomFormCheckboxGroup;
