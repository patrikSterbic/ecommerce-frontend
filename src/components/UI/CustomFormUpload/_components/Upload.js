import React from "react";
import uuidv4 from "uuid/v4";
import { OrderedMap, List } from "immutable";
import accepts from "attr-accept";
import { isArray } from "lodash";

import CustomFormUploadedFile from "./CustomFormUploadedFile";

const supportMultiple =
  typeof document !== "undefined" && document && document.createElement
    ? "multiple" in document.createElement("input")
    : true;

class Upload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onClick = this._onClick.bind(this);
    this.onFileDialogCancel = this.onFileDialogCancel.bind(this);
    this.state = { files: OrderedMap(), isFileDialogActive: false };
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    document.body.onfocus = this.onFileDialogCancel;

    const value = this.props.value;
    if (value !== null || value !== undefined || value !== "") {
      if (List.isList(value)) {
        this._setFiles(value.toJS());
      }
      if (isArray(value)) {
        this._setFiles(value);
      }
    }
  }

  /**
   * Handlers
   */
  _getDataTransferFiles = event => {
    let dataTransferItemsList = [];
    if (event.dataTransfer) {
      const dt = event.dataTransfer;
      if (dt.files && dt.files.length) {
        dataTransferItemsList = dt.files;
      } else if (dt.items && dt.items.length) {
        dataTransferItemsList = dt.items;
      }
    } else if (event.target && event.target.files) {
      dataTransferItemsList = event.target.files;
    }
    return Array.prototype.slice.call(dataTransferItemsList);
  };

  _fileAccepted = (file, accept) => {
    return file.type === "application/x-moz-file" || accepts(file, accept);
  };

  _fileMatchSize = file => {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize;
  };

  _onClick(event) {
    const { onClick, disableClick } = this.props;
    if (!disableClick) {
      event.stopPropagation();
      this.open();
      if (onClick) {
        onClick.call(this, event);
      }
    }
  }

  open() {
    this.setState({ isFileDialogActive: true });
    this.fileInputEl.value = null;
    this.fileInputEl.click();
  }

  _startGettingFile = file => {
    const that = this;

    return new Promise((resolve, reject) => {
      const fileId = uuidv4();
      that.setState({
        files: that.state.files.set(fileId, {
          fileId: fileId,
          isLoading: true,
          fileInfo: file
        })
      });

      const reader = new FileReader();
      reader.onload = e => {
        const fileState = {
          fileId: fileId,
          isLoading: false,
          fileInfo: file,
          dataUrl: e.target.result
        };

        that.setState({
          files: that.state.files.updateIn([fileId], () => fileState)
        });
        resolve();
      };

      reader.onerror = e => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  };

  _handleFiles = files => {
    let readyFiles = List();
    files.map(file => {
      readyFiles = readyFiles.push(file.fileInfo);
      return; // eslint-disable-line array-callback-return
    });
    return readyFiles.toJS();
  };

  _handleDrop = event => {
    const files = this._getDataTransferFiles(event);

    this._setFiles(files);
  };

  _setFiles = files => {
    let acceptedFiles = [];

    files.map(file => {
      if (
        this._fileMatchSize(file) &&
        this._fileAccepted(file, this.props.accept)
      ) {
        acceptedFiles.push(file);
      }
      return; // eslint-disable-line array-callback-return
    });

    Promise.all(acceptedFiles.map(f => this._startGettingFile(f))).then(() => {
      this.props.onDrop &&
        this.props.onDrop(this._handleFiles(this.state.files));
    });
  };

  onFileDialogCancel() {
    const { onFileDialogCancel } = this.props;
    const { fileInputEl } = this;
    let { isFileDialogActive } = this;

    if (onFileDialogCancel && isFileDialogActive) {
      setTimeout(() => {
        const FileList = fileInputEl.files;
        if (!FileList.length) {
          isFileDialogActive = false;
          onFileDialogCancel();
        }
      }, 300);
    }
  }

  setRef(ref) {
    this.node = ref;
  }

  _handleSingleRemove = fileId => {
    const restOfFiles = this.state.files.delete(fileId);
    this.setState({ files: restOfFiles });
    setTimeout(() => {
      this.props.onDrop &&
        this.props.onDrop(this._handleFiles(this.state.files));
    }, 200);
  };

  _handleLoadingComponent = loading => {
    if (typeof loading === "function") {
      return loading();
    }
    return loading;
  };

  _handleFilesOrder = () => {
    if (this.props.reverseFileFlow) {
      return this.state.files.reverse();
    }
    return this.state.files;
  };

  _handleLoadingImageComponent = file => {
    if (this.props.loading) {
      return (
        <div key={file.fileId}>
          {this._handleLoadingComponent(this.props.loading)}
        </div>
      );
    } else {
      return (
        <div key={file.fileId} className="spinner">
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      );
    }
  };

  _handleLoadingTextComponent = file => {
    return (
      <div key={file.fileId}>
        {this._handleLoadingComponent(this.props.loading)}
      </div>
    );
  };
  /**
   * Render
   */
  render() {
    const {
      style,
      accept,
      multiple,
      className,
      previewImages,
      classNameImage,
      classNameText,
      label
    } = this.props;

    const inputAttributes = {
      accept,
      type: "file",
      style: { display: "none" },
      multiple: supportMultiple && multiple,
      ref: el => (this.fileInputEl = el), // eslint-disable-line
      onChange: this._handleDrop
    };

    const buttonAttributes = {
      className: `${className} dropper ${
        previewImages ? "dropzone-images" : ""
      } ${label ? "hasLabel" : ""}`,
      onDrop: this._handleDrop,
      onClick: this._onClick,
      style,
      ref: this.setRef
    };

    let files = this._handleFilesOrder();

    return (
      <div>
        {previewImages &&
          files &&
          files.toList().map(file => {
            // images
            return (
              <CustomFormUploadedFile
                previewImages
                key={file.fileId}
                file={file}
                removeFunction={this._handleSingleRemove}
                className={classNameImage}
                isLoading={file.isLoading}
                loading={this._handleLoadingImageComponent}
              />
            );
          })}
        <input {...inputAttributes} />
        <div {...buttonAttributes}>
          {label && <div className="dropzone-label">{label}</div>}
        </div>
        {!previewImages &&
          files &&
          files.toList().map(file => {
            // texts
            return (
              <CustomFormUploadedFile
                key={file.fileId}
                file={file}
                removeFunction={this._handleSingleRemove}
                className={classNameText}
                isLoading={file.isLoading}
                loading={this._handleLoadingTextComponent}
              />
            );
          })}
      </div>
    );
  }
}

Upload.defaultProps = {
  multiple: true,
  maxSize: Infinity,
  minSize: 0,
  reverseFileFlow: false
};

export default Upload;
