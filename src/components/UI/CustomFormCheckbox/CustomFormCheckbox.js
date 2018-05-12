import React from "react";
import { Checkbox, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;

const CustomFormCheckbox = ({
  /* Checkbox */
  checkboxText,
  onCustomChange,
  disabled,

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
      className={`${hasFeedback ? "uikit-checkbox" : null}`}
    >
      {renderTooltip(
        <Checkbox
          disabled={disabled}
          checked={input && !!input.value}
          {...input}
          onBlur={value => {
            if (input.value !== "") {
              input.onBlur(!!input.value);
            }
          }}
          onChange={value => {
            if (input.value !== "") {
              input.onChange(!!!input.value);
            }
            if (onCustomChange) {
              onCustomChange(value);
            }
          }}
        >
          {checkboxText}
        </Checkbox>,
        useStandardErrorMsg,
        errorMsg,
        { placement: tooltipPlacement }
      )}
    </FormItem>
  );
};

CustomFormCheckbox.defaultProps = {
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false,
  disabled: false
};

export default CustomFormCheckbox;
