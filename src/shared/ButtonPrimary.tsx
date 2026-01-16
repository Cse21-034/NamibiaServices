import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
  className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-[#f7b717] hover:bg-[#e0a814] text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
