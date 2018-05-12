import React from "react";
import { Modal } from "antd";
import _ from "lodash";

class CustomModal extends React.Component {
  render() {
    const {
      visible,
      confirmLoading,
      title,
      closable,
      onOk,
      onCancel,
      width,
      footer,
      okText,
      cancelText,
      maskClosable,
      style,
      wrapClassName,
      afterClose
    } = this.props;

    if (footer === undefined) {
      return (
        <Modal
          visible={visible}
          confirmLoading={confirmLoading}
          title={title}
          closable={closable}
          okText={okText}
          cancelText={cancelText}
          onOk={event => {
            if (_.isFunction(onOk)) {
              onOk(event);
            }
            setTimeout(() => document.activeElement.blur(), 100);
          }}
          onCancel={event => {
            if (_.isFunction(onCancel)) {
              onCancel(event);
            }
            setTimeout(() => document.activeElement.blur(), 100);
          }}
          width={width}
          maskClosable={maskClosable}
          style={style}
          wrapClassName={wrapClassName}
          afterClose={afterClose}
        >
          {this.props.children}
        </Modal>
      );
    }

    return (
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        title={title}
        closable={closable}
        okText={okText}
        cancelText={cancelText}
        onOk={event => {
          if (_.isFunction(onOk)) {
            onOk(event);
          }
          setTimeout(() => document.activeElement.blur(), 100);
        }}
        onCancel={event => {
          if (_.isFunction(onCancel)) {
            onCancel(event);
          }
          setTimeout(() => document.activeElement.blur(), 100);
        }}
        width={width}
        maskClosable={maskClosable}
        style={style}
        wrapClassName={wrapClassName}
        afterClose={afterClose}
        footer={footer}
      >
        {this.props.children}
      </Modal>
    );
  }
}

CustomModal.defaultProps = {
  closable: true,
  width: 520,
  okText: "Ok",
  cancelText: "Cancel",
  maskClosable: true,
  footer: undefined
};

CustomModal.info = function({
  title,
  content,
  onOk,
  onCancel,
  width,
  iconType,
  okText,
  cancelText,
  maskClosable
}) {
  const customCancel = event => {
    if (_.isFunction(onCancel)) {
      onCancel(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  const customOk = event => {
    if (_.isFunction(onOk)) {
      onOk(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };

  return Modal.info({
    title,
    content,
    onOk: customOk,
    onCancel: customCancel,
    width,
    iconType,
    okText,
    cancelText,
    maskClosable
  });
};

CustomModal.success = function({
  title,
  content,
  onOk,
  onCancel,
  width,
  iconType,
  okText,
  cancelText,
  maskClosable
}) {
  const customCancel = event => {
    if (_.isFunction(onCancel)) {
      onCancel(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  const customOk = event => {
    if (_.isFunction(onOk)) {
      onOk(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };

  return Modal.success({
    title,
    content,
    onOk: customOk,
    onCancel: customCancel,
    width,
    iconType,
    okText,
    cancelText,
    maskClosable
  });
};

CustomModal.error = function({
  title,
  content,
  onOk,
  onCancel,
  width,
  iconType,
  okText,
  cancelText,
  maskClosable
}) {
  const customCancel = event => {
    if (_.isFunction(onCancel)) {
      onCancel(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  const customOk = event => {
    if (_.isFunction(onOk)) {
      onOk(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };

  return Modal.error({
    title,
    content,
    onOk: customOk,
    onCancel: customCancel,
    width,
    iconType,
    okText,
    cancelText,
    maskClosable
  });
};

CustomModal.warning = function({
  title,
  content,
  onOk,
  onCancel,
  width,
  iconType,
  okText,
  cancelText,
  maskClosable
}) {
  const customCancel = event => {
    if (_.isFunction(onCancel)) {
      onCancel(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  const customOk = event => {
    if (_.isFunction(onOk)) {
      onOk(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };

  return Modal.warning({
    title,
    content,
    onOk: customOk,
    onCancel: customCancel,
    width,
    iconType,
    okText,
    cancelText,
    maskClosable
  });
};

CustomModal.confirm = function({
  title,
  content,
  onOk,
  onCancel,
  width,
  iconType,
  okText,
  cancelText,
  maskClosable
}) {
  const customCancel = event => {
    if (_.isFunction(onCancel)) {
      onCancel(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  const customOk = event => {
    if (_.isFunction(onOk)) {
      onOk(event);
    }
    setTimeout(() => document.activeElement.blur(), 100);
  };
  return Modal.confirm({
    title,
    content,
    onOk: customOk,
    onCancel: customCancel,
    width,
    iconType,
    okText,
    cancelText,
    maskClosable
  });
};

export default CustomModal;
