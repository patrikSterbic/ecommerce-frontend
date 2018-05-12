import React from "react";
import ReactDOM from "react-dom";
import { InputNumber, Form } from "antd";
import { findClass, getInitialValidation, renderTooltip } from "../utils";

const FormItem = Form.Item;

class CustomFormInputNumber extends React.Component {
  componentDidUpdate() {
    const { maxLength } = this.props;
    if (maxLength) {
      const inputNumberWrapper = ReactDOM.findDOMNode(this._inputNumber);
      const inputNumber = findClass(
        inputNumberWrapper,
        "ant-input-number-input"
      );
      inputNumber.setAttribute("maxLength", maxLength);
    }
  }

  render() {
    const {
      /* Input Number */
      min,
      max,
      step,
      disabled,
      size,
      onCustomChange,
      validationTooltipEnabled,

      /* FormItem */
      label,
      labelCol,
      wrapperCol,
      extra,
      required,
      hasFeedback,
      colon,
      formatter,

      /* Tooltip */
      useStandardErrorMsg,
      tooltipPlacement,

      /* Internationalization */
      formatMessage,

      /* redux form */
      meta,
      input
    } = this.props;
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
    const isRequired = error && error.isRequired; // Hack pro automatické zjištění, zda je required

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
        hasFeedback={disabled ? false : hasFeedback}
        colon={colon}
        className={`${hasFeedback ? "uikit-input-number" : null} ${
          isRequired ? "is-required" : ""
        }`}
      >
        {renderTooltip(
          <InputNumber
            ref={input => (this._inputNumber = input)}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            size={size}
            value={input.value}
            formatter={formatter}
            onChange={value => {
              input.onFocus();
              input.onChange(value);
              input.onBlur();

              if (onCustomChange) {
                onCustomChange(value);
              }
            }}
          />,
          useStandardErrorMsg,
          errorMsg,
          { validationTooltipEnabled, placement: tooltipPlacement }
        )}
      </FormItem>
    );
  }
}

CustomFormInputNumber.defaultProps = {
  size: "large",
  min: -Infinity,
  max: Infinity,
  step: 1,
  disabled: false,
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false
};

export default CustomFormInputNumber;
