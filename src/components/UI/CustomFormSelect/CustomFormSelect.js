import React from "react";
import ReactDOM from "react-dom";
import { Select, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class CustomFormSelect extends React.Component {
  /**
   * Helpers
   */
  renderTabIndexHack(tabIndex, selectInput) {
    const domSelectInput = ReactDOM.findDOMNode(this._selectInput);

    domSelectInput.firstChild.setAttribute("tabindex", tabIndex);
  }

  /**
   * React events
   */
  componentDidMount() {
    if (this.props.disabled) {
      this.renderTabIndexHack("-1", this._selectInput);
    } else {
      this.renderTabIndexHack(this.props.tabIndex, this._selectInput);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tabIndex !== prevProps.tabIndex) {
      this.renderTabIndexHack(this.props.tabIndex, this._selectInput);
    } else if (this.props.disabled !== prevProps.disabled) {
      if (this.props.disabled) {
        this.renderTabIndexHack("-1", this._selectInput);
      } else {
        this.renderTabIndexHack(this.props.tabIndex, this._selectInput);
      }
    }
  }

  handleOnFocus = () => {
    if (!this.props.disabled) {
      this.props.input.onFocus();

      if (this.props.openOnFocus) {
        const domSelectInput = ReactDOM.findDOMNode(this._selectInput);
        const inputValue = this.props.input.value;
        const valueIsEmpty =
          inputValue === null ||
          inputValue === undefined ||
          inputValue === "" ||
          inputValue.key === null ||
          inputValue.key === "" ||
          (this.props.labelInValue
            ? parseInt(inputValue.key, 10) < 0
            : parseInt(inputValue, 10) < 0);

        if (
          valueIsEmpty &&
          domSelectInput &&
          domSelectInput.className.indexOf("ant-select-open") === -1
        ) {
          domSelectInput.click();
          domSelectInput.focus();
        }
      }
    }
  };

  /**
   * Render
   */
  render() {
    const {
      /* Select */
      allowClear,
      filterOption,
      onSelect,
      onDeselect,
      onSearch,
      onCustomChange,
      placeholder,
      mode,
      notFoundContent,
      dropdownMatchSelectWidth,
      optionFilterProp,
      optionLabelProp,
      combobox,
      size,
      showSearch,
      disabled,
      defaultActiveFirstOption,
      dropdownStyle,
      dropdownClassName,
      getPopupContainer,
      labelInValue,
      tokenSeparators,
      validationTooltipEnabled,
      tabIndex,
      onCustomBlur,

      /* Option data */
      optionData,

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
          !active && meta
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
          mode === "multiple" ? "multiple-select" : ""
        } custom-select-feedback ${isRequired ? "is-required" : ""}`}
      >
        {renderTooltip(
          <Select
            ref={select => (this._selectInput = select)}
            allowClear={
              (input.value === null ||
                input.value === undefined ||
                input.value === "") &&
              allowClear
                ? false
                : allowClear
            }
            filterOption={filterOption}
            onSelect={onSelect}
            onDeselect={onDeselect}
            onSearch={onSearch}
            placeholder={placeholder}
            notFoundContent={notFoundContent}
            dropdownMatchSelectWidth={dropdownMatchSelectWidth}
            optionFilterProp={optionFilterProp}
            optionLabelProp={optionLabelProp}
            combobox={combobox}
            size={size}
            mode={mode}
            tabIndex={tabIndex}
            showSearch={showSearch}
            disabled={disabled}
            defaultActiveFirstOption={defaultActiveFirstOption}
            dropdownStyle={dropdownStyle}
            dropdownClassName={dropdownClassName}
            getPopupContainer={getPopupContainer}
            labelInValue={labelInValue}
            tokenSeparators={tokenSeparators}
            {...input}
            className={`select-is-still-active-${active}`}
            onFocus={this.handleOnFocus}
            onChange={value => {
              input.onChange(value === undefined ? "" : value);

              if (onCustomChange) {
                onCustomChange(value);
              }
            }}
            onBlur={event => {
              input.onBlur(event);

              if (onCustomBlur) {
                onCustomBlur(input.value);
              }
            }}
            value={
              (input.value === null ||
                input.value === undefined ||
                input.value === "") &&
              placeholder
                ? undefined
                : input.value
            }
          >
            {optionData}
          </Select>,
          useStandardErrorMsg,
          errorMsg,
          { validationTooltipEnabled, placement: tooltipPlacement }
        )}
      </FormItem>
    );
  }
}

CustomFormSelect.defaultProps = {
  size: "large",
  mode: null,
  allowClear: false,
  filterOption: true,
  notFoundContent: "No item to select!",
  dropdownMatchSelectWidth: true,
  optionLabelProp: "children",
  combobox: false,
  showSearch: false,
  disabled: false,
  defaultActiveFirstOption: true,
  labelInValue: false,
  required: false,
  hasFeedback: false,
  colon: false,
  openOnFocus: false,
  useStandardErrorMsg: false,
  tabIndex: "0"
};

export default CustomFormSelect;
export { Option, OptGroup };
