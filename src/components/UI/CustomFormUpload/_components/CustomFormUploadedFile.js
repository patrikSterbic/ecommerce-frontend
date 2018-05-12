import React from "react";

class CustomFormUploadedFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDeletingFile: false };
  }

  /**
   * Handlers
   */
  _handleSingleRemove = () => {
    this.setState({ isDeletingFile: true });
    setTimeout(() => this.props.removeFunction(this.props.file.fileId), 200);
  };
  /**
   * Render
   */
  render() {
    const {
      /* Uploaded file */
      file,
      previewImages,
      className,
      isLoading,
      loading
    } = this.props;

    if (previewImages) {
      return (
        <div
          className={`${className} image-box ${
            this.state.isDeletingFile ? "isBeingDeleted" : ""
          }`}
          onClick={this._handleSingleRemove}
        >
          {isLoading && loading(file)}
          {!isLoading && (
            <div className="image-opacity">
              <img
                key={file.fileId}
                className="image"
                id={file.fileId}
                src={`${file.dataUrl}`}
                alt={file.fileId}
              />
            </div>
          )}
        </div>
      );
    }
    return (
      <div
        className={`${className} file-box  ${
          this.state.isDeletingFile ? "isBeingDeleted" : ""
        }`}
      >
        {isLoading && loading(file)}
        {!isLoading && (
          <div>
            <div className="file-info">{file.fileInfo.name}</div>
            <div className="file-remove" onClick={this._handleSingleRemove} />
          </div>
        )}
      </div>
    );
  }
}

export default CustomFormUploadedFile;
