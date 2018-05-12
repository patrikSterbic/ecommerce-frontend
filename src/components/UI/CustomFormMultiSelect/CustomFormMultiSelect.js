import React from "react";
import { Select, Form } from "antd";
import { renderTooltip, getInitialValidation } from "../utils";

const FormItem = Form.Item;

const CustomFormMultiSelect = ({
  /* Select */
  multiple,
  allowClear,
  filterOption,
  tags,
  onSelect,
  onDeselect,
  onSearch,
  placeholder,
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
}) => {
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
  const isRequired = error && error.isRequired;

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
      className={`${isRequired ? "is-required" : ""}`}
    >
      {renderTooltip(
        <Select
          multiple={multiple ? multiple : tags && false}
          tags={tags ? !multiple && true : false}
          allowClear={allowClear}
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
          showSearch={showSearch}
          disabled={disabled}
          defaultActiveFirstOption={defaultActiveFirstOption}
          dropdownStyle={dropdownStyle}
          dropdownClassName={dropdownClassName}
          getPopupContainer={getPopupContainer}
          labelInValue={labelInValue}
          tokenSeparators={tokenSeparators}
          className={`select-is-still-active-${active}`}
          {...input}
        >
          {optionData}
        </Select>,
        useStandardErrorMsg,
        errorMsg,
        { placement: tooltipPlacement }
      )}
    </FormItem>
  );
};

CustomFormMultiSelect.defaultProps = {
  size: "large",
  allowClear: false,
  filterOption: true,
  notFoundContent: "Žádná položka k výběru",
  dropdownMatchSelectWidth: true,
  optionLabelProp: "children",
  combobox: false,
  showSearch: false,
  disabled: false,
  defaultActiveFirstOption: true,
  labelInValue: false,
  multiple: true,
  tags: false,
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false
};

export default CustomFormMultiSelect;
