/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { isFunction } from "lodash";
import { Select, Form, Icon } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;

const DEFAULT_STATE = {
  search: "",
  loadingData: false,
  optionsData: []
};

const TRUE_FILTER_OPTION = () => true;

class CustomFormLazySelect extends React.Component {
  state = DEFAULT_STATE;

  /**
   * Helpers
   */
  renderTabIndexHack(tabIndex) {
    const domSelectInput = ReactDOM.findDOMNode(this._selectInput);

    domSelectInput.firstChild.setAttribute("tabindex", tabIndex);
  }

  /**
   * React events
   */
  componentDidMount() {
    const { disabled, tabIndex, input } = this.props;
    if (disabled) {
      this.renderTabIndexHack("-1");
    } else {
      this.renderTabIndexHack(tabIndex);
    }
    if (
      input.value === null ||
      input.value === undefined ||
      input.value === ""
    ) {
      this.onSearch("");
    } else {
      this.onSearch(input.value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tabIndex !== prevProps.tabIndex) {
      this.renderTabIndexHack(this.props.tabIndex);
    } else if (this.props.disabled !== prevProps.disabled) {
      if (this.props.disabled) {
        this.renderTabIndexHack("-1");
      } else {
        this.renderTabIndexHack(this.props.tabIndex);
      }
    }
  }

  /**
   * Event handlers
   */
  onSearch = value => {
    if (value.length >= this.props.minSearchLength && !this.props.disabled) {
      if (isFunction(this.props.onSearch)) {
        this.setState({
          ...this.state,
          search: value,
          loadingData: true
        });
        this.props.onSearch(value, this.onOptionDataLoaded);
      }
    } else {
      this.setState({
        ...this.state,
        search: value,
        optionsData: value.length === 0 ? null : this.state.optionsData
      });
    }
  };

  onOptionDataLoaded = optionsData => {
    if (optionsData) {
      this.setState({
        ...this.state,
        loadingData: false,
        optionsData
      });
    } else {
      this.setState({
        ...this.state,
        loadingData: false,
        optionsData: null
      });
    }
  };

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
          domSelectInput &&
          domSelectInput.className.indexOf("ant-select-open") === -1
        ) {
          domSelectInput.click();
          domSelectInput.focus();

          this.onSearch("");
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
      className,
      allowClear,
      onSelect,
      onDeselect,
      onCustomChange,
      placeholder,
      notFoundContent,
      startSearchContent,
      dropdownMatchSelectWidth,
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
      minSearchLength,
      validationTooltipEnabled,

      /* FormItem */
      selectedOption,
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

    const validationStatus = meta
      ? touched
        ? asyncValidating || submitting
          ? "validating"
          : valid
            ? "success"
            : "error"
        : getInitialValidation(input, meta)
      : "";
    const valueIsEmpty =
      input.value === null || input.value === undefined || input.value === "";
    const isRequired = error && error.isRequired;

    return (
      <FormItem
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        help={useStandardErrorMsg && errorMsg}
        extra={extra}
        required={required}
        validateStatus={validationStatus}
        hasFeedback={hasFeedback}
        colon={colon}
        className={`custom-select-feedback ${isRequired ? "is-required" : ""} ${
          hasFeedback && validationStatus !== ""
            ? "has-feedback-spinner-position"
            : "default-spinner-position"
        } ${this.state.loadingData && "spinner-is-on"}`}
      >
        {renderTooltip(
          <div onClick={this.handleOnFocus}>
            <Select
              ref={select => (this._selectInput = select)}
              allowClear={allowClear}
              onSelect={onSelect}
              onDeselect={onDeselect}
              onSearch={this.onSearch}
              placeholder={placeholder}
              notFoundContent={
                this.state.search.length >= minSearchLength
                  ? notFoundContent
                  : startSearchContent
              }
              dropdownMatchSelectWidth={dropdownMatchSelectWidth}
              optionLabelProp={optionLabelProp}
              combobox={combobox}
              size={size}
              showSearch={showSearch}
              disabled={disabled}
              defaultActiveFirstOption={defaultActiveFirstOption}
              dropdownStyle={dropdownStyle}
              dropdownClassName={dropdownClassName}
              getPopupContainer={getPopupContainer}
              labelInValue={labelInValue}
              tokenSeparators={tokenSeparators}
              filterOption={TRUE_FILTER_OPTION}
              className={`select-is-still-active-${active} ${className || ""}`}
              {...input}
              onChange={value => {
                input.onChange(value === undefined ? null : value);

                if (onCustomChange) {
                  onCustomChange(value, selectedOption, input);
                }
              }}
              onFocus={this.handleOnFocus}
              value={
                valueIsEmpty
                  ? undefined
                  : input.value === ""
                    ? undefined
                    : input.value
              }
            >
              {!this.state.optionsData || this.state.optionsData.length === 0
                ? selectedOption
                : this.state.optionsData}
            </Select>
          </div>,
          useStandardErrorMsg,
          errorMsg,
          { validationTooltipEnabled, placement: tooltipPlacement }
        )}
        {this.state.loadingData && <Icon type="loading" />}
      </FormItem>
    );
  }
}

CustomFormLazySelect.defaultProps = {
  size: "large",
  allowClear: false,
  notFoundContent: "Žádná položka k výběru",
  startSearchContent: "Zadejte alespoň tři znaky...",
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
  minSearchLength: 3,
  openOnFocus: false,
  useStandardErrorMsg: false,
  tabIndex: "0"
};

export default CustomFormLazySelect;
