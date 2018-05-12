import React from "react";
import { Form } from "antd";
import Upload from "./_components/Upload";
import { getInitialValidation } from "../utils";

const FormItem = Form.Item;

class CustomFormUpload extends React.Component {
  render() {
    const {
      /* Upload */
      accept,
      multiple,
      maxSize,
      minSize,
      className,
      onClick,
      onFileDialogCancel,
      previewImages,
      onDrop,
      loading,
      fileImage,
      classNameText,
      classNameImage,
      reverseFileFlow,

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

    return (
      <FormItem
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
      >
        <div className="dropzone-container">
          <Upload
            accept={accept}
            multiple={multiple}
            maxSize={maxSize}
            minSize={minSize}
            className={`${className ? className : ""} dropzone ${
              previewImages ? "dropzone-images" : ""
            }`}
            onClick={onClick}
            onDrop={files => {
              input.onChange(files);
              if (onDrop) {
                onDrop(files);
              }
            }}
            value={input.value}
            onFileDialogCancel={onFileDialogCancel}
            previewImages={previewImages}
            loading={loading}
            fileImage={fileImage}
            classNameImage={classNameImage}
            classNameText={classNameText}
            label={label}
            reverseFileFlow={reverseFileFlow}
          />
        </div>
      </FormItem>
    );
  }
}

CustomFormUpload.defaultProps = {
  required: false,
  hasFeedback: false,
  colon: false,
  useStandardErrorMsg: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0,
  previewImages: false,
  reverseFileFlow: false
};

export default CustomFormUpload;
