import React from "react";
import { Button } from "antd";

const CustomButton = ({
  text,
  type,
  htmlType,
  icon,
  shape,
  size,
  loading,
  onClick,
  ghost,
  disabled
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      icon={icon}
      shape={shape}
      size={size}
      loading={loading}
      onClick={onClick}
      ghost={ghost}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

CustomButton.defaultProps = {
  type: "default",
  htmlType: "button",
  size: "large",
  loading: false,
  ghost: false,
  disabled: false
};

export default CustomButton;
