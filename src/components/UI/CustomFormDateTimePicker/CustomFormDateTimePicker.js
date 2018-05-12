import React from "react";
import { Form, Icon, Button } from "antd";
import _ from "lodash";
import moment from "moment";
import { renderTooltip, getInitialValidation } from "../utils";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

const FormItem = Form.Item;

class CustomFormDateTimePicker extends React.Component {
  _handleInputSize() {
    const { size } = this.props;
    if (size === "large") {
      return "rw-input-lg";
    }
    return "rw-input-df";
  }

  _handleValue = inputValue => {
    if (!inputValue) {
      return undefined;
    }
    let value;
    if (inputValue.hasOwnProperty("target")) {
      value = inputValue.target ? inputValue.target.value : inputValue;
    } else {
      value = inputValue;
    }
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    if (_.isDate(value)) {
      return moment(value).toDate();
    }
    if (moment.isMoment(value)) {
      return value.toDate();
    }
    if (_.isString(value) && value.indexOf("T") >= 0) {
      return moment(value).toDate();
    }
    return moment(value, this.props.dateFormat).toDate();
  };

  _handleValueChange = inputValue => {
    if (!inputValue) {
      return undefined;
    }
    let value;
    if (inputValue.hasOwnProperty("target")) {
      value = inputValue.target ? inputValue.target.value : inputValue;
    } else {
      value = inputValue;
    }
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      Object.prototype.toString.call(value) !== "[object Date]"
    ) {
      return undefined;
    }
    if (_.isDate(value)) {
      return moment(value);
    }
    if (moment.isMoment(value)) {
      return value;
    }
    return moment(value, this.props.dateFormat);
  };

  _handleMessagesDefaultValue() {
    const { messages, calendarButtonMessage, timeButtonMessage } = this.props;
    if (!messages.hasOwnProperty("calendarButton")) {
      messages.calendarButton = calendarButtonMessage;
    }
    if (!messages.hasOwnProperty("timeButton")) {
      messages.timeButton = timeButtonMessage;
    }
    return messages;
  }

  _handleVerifyButtonClick = () => {
    const { verifyOnClick } = this.props;
    verifyOnClick();
  };

  render() {
    const {
      /* DatePicker */
      disabled,
      style,
      disableCalendar,
      openOnDate,
      onAfterOpenOnDateChange,
      finalView,
      placeholder,
      dateFormat,
      onCustomChange,
      onCustomSelect,
      minDate,
      maxDate,
      editFormat,
      initialView,
      open,
      onCustomToggle,
      dropdownDuration,
      validationTooltipEnabled,
      verifyDate,
      verifyOnClick,

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

    const { error, asyncValidating, submitting, touched, valid, active } = meta
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
        className={`${
          hasFeedback ? "uikit-calendar-picker" : null
        } ${this._handleInputSize()} ${isRequired ? "is-required" : ""} ${
          verifyDate ? "has-verify" : ""
        }`}
      >
        {renderTooltip(
          <DateTimePicker
            ref={dateTime => (this._dateTime = dateTime)}
            onToggle={isOpen => {
              if (onCustomToggle) {
                onCustomToggle(isOpen);
              }
            }}
            disabled={disabled}
            messages={this._handleMessagesDefaultValue()}
            duration={dropdownDuration}
            finalView={finalView}
            initialView={initialView}
            open={open}
            min={minDate && this._handleValue(minDate)}
            max={maxDate && this._handleValue(maxDate)}
            currentDate={openOnDate && this._handleValue(openOnDate)}
            editFormat={editFormat}
            style={style}
            format={dateFormat}
            calendar={!disableCalendar}
            time={false}
            placeholder={placeholder}
            value={this._handleValue(input.value)}
            onFocus={value => input.onFocus(this._handleValueChange(value))}
            onBlur={value => input.onBlur(this._handleValueChange(value))}
            onChange={value => {
              if (onCustomChange) {
                onCustomChange(this._handleValueChange(value));
              }
              input.onChange(this._handleValueChange(value));
            }}
            onCurrentDateChange={onAfterOpenOnDateChange}
            onSelect={value => {
              if (onCustomSelect) {
                onCustomSelect(this._handleValueChange(value));
              }
            }}
          />,
          useStandardErrorMsg,
          errorMsg,
          {
            active: errorMsg && active,
            validationTooltipEnabled,
            placement: tooltipPlacement
          }
        )}
        {verifyDate && (
          <Button
            ref={dateTimeButton => (this._dateTimeButton = dateTimeButton)}
            className="verify-date"
            onClick={this._handleVerifyButtonClick}
          >
            <Icon type="check" />
          </Button>
        )}
      </FormItem>
    );
  }
}

CustomFormDateTimePicker.defaultProps = {
  size: "large",
  initialView: "month",
  finalView: "century",
  allowClear: true,
  disabled: false,
  disableCalendar: false,
  style: {},
  dateFormat: "DD.MM.YYYY",
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false,
  open: undefined,
  calendarButtonMessage: "Otevřít kalendář",
  timeButtonMessage: "Otevřít hodiny",
  messages: {},
  verifyDate: false
};

export default CustomFormDateTimePicker;
