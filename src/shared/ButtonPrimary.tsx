import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
  className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-[#612C30] hover:bg-[#4a2124] text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
