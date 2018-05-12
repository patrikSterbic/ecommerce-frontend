import React from "react";
import { Radio, Form } from "antd";
import { each, findIndex, has, hasIn } from "lodash";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class CustomFormRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
  }
  /**
   * Helpers
   */
  _checkAllButtonsForDisabled = () => {
    const { radioData } = this.props;
    let dataIsDisabled = false;

    if (radioData) {
      if (radioData.length > 0) {
        each(radioData, item => {
          if (hasIn(item, "props.disabled")) {
            if (!item.props.disabled) {
              return false;
            }
          } else {
            return false;
          }
          dataIsDisabled = true;
        });
      }
    }
    return dataIsDisabled;
  };

  renderTabIndexHack() {
    const everyButtonIsDisabled = this._checkAllButtonsForDisabled();

    if (this.props.disabled || everyButtonIsDisabled) {
      const domRadioInput = this._fakeInput;
      domRadioInput.setAttribute("tabindex", "-1");
    } else {
      const domRadioInput = this._fakeInput;
      domRadioInput.setAttribute("tabindex", "0");
    }

    const docSelectedAntdInputs = document.getElementsByClassName(
      "ant-radio-button-input"
    );
    each(docSelectedAntdInputs, item => item.setAttribute("tabindex", "-1"));
  }

  _handleKeyPress = event => {
    const index = this._getCheckedIndex();

    event = event || window.event;
    //left arrow
    if (event.keyCode === 37) {
      this._handleChangePosition(index - 1);
    }
    //right arrow
    else if (event.keyCode === 39) {
      this._handleChangePosition(index + 1);
    }
  };

  _handleChangePosition = newIndex => {
    const { radioData } = this.props;

    if (radioData) {
      const arraySize = radioData.length - 1;
      if (newIndex > arraySize) {
        this._handleChange(0);
      }
      if (newIndex < 0) {
        this._handleChange(arraySize);
      }
      if (newIndex >= 0 || newIndex <= arraySize) {
        this._handleChange(newIndex);
      }
    }
  };

  _handleChange = newArrayIndex => {
    const { input, radioData } = this.props;

    if (radioData && input) {
      if (has(radioData[newArrayIndex], "key")) {
        input.onChange(radioData[newArrayIndex].props.value);
      }
    }
  };

  _getCheckedIndex = () => {
    const { input, radioData } = this.props;

    if (input && radioData) {
      if (radioData.length > 0) {
        return findIndex(radioData, item => {
          if (has(item, "key")) {
            return item.key.toString() === input.value.toString();
          }
        });
      }
    }
  };

  /**
   * React events
   */
  componentDidMount() {
    this.renderTabIndexHack();
  }

  componentDidUpdate() {
    this.renderTabIndexHack();
  }

  render() {
    const {
      /* RadioGroup */
      size,
      className,
      onCustomChange,
      validationTooltipEnabled,
      validationTooltipClassName,

      /* radioData */
      radioData,

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
    } = this.props;

    const { error, asyncValidating, submitting, valid, touched, active } = meta
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
        className={`uikit-radio-group ${className ? className : ""} ${
          this.state.isFocused ? "radio-group-isFocused" : ""
        }`}
      >
        <input
          ref={input => (this._fakeInput = input)}
          className={`radio-group-input`}
          onFocus={event => {
            input.onFocus(event);
            this.setState({ isFocused: true });
          }}
          onBlur={() => this.setState({ isFocused: false })}
          onKeyDown={this._handleKeyPress}
        />
        {renderTooltip(
          <RadioGroup
            {...input}
            onChange={value => {
              input.onChange(value);
              if (onCustomChange) {
                onCustomChange(value);
              }
            }}
            size={size}
          >
            {radioData && radioData.length !== 0 ? (
              radioData
            ) : (
              <span>No data</span>
            )}
          </RadioGroup>,
          useStandardErrorMsg,
          errorMsg,
          {
            active: errorMsg && active,
            validationTooltipEnabled,
            tooltipClassName: validationTooltipClassName,
            placement: tooltipPlacement
          }
        )}
      </FormItem>
    );
  }
}

CustomFormRadioGroup.defaultProps = {
  size: "large",
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false,
  disabled: false
};

export default CustomFormRadioGroup;

export { RadioButton };
