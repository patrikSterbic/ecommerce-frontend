import React from "react";
import { Switch, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;

const CustomFormSwitch = ({
  /* Switch */
  checkedChildren,
  unCheckedChildren,
  size,
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
      className={`${hasFeedback ? "uikit-switch" : null}`}
    >
      {renderTooltip(
        <Switch
          {...input}
          onChange={value => {
            input.onChange(value);

            if (onCustomChange) {
              onCustomChange(value);
            }
          }}
          checked={input && input.value}
          defaultChecked={input && input.value}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          size={size}
        />,
        useStandardErrorMsg,
        errorMsg,
        { placement: tooltipPlacement }
      )}
    </FormItem>
  );
};

CustomFormSwitch.defaultProps = {
  size: "default",
  defaultChecked: false,
  checked: false,
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false
};

export default CustomFormSwitch;
