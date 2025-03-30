import React from "react";
import { Input as CustomInput } from "./ui";
import { cn } from "../../utils/cn.util";

type props = {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
};

const Input = ({ ...props }: props) => {
  return (
    <CustomInput
      placeholder={props.placeholder}
      onChange={(event) => props.onChange && props.onChange(event)}
      disabled={props.disabled}
      value={props.value as string}
      className={cn(
        "active:border-none focus:border-none h-12",
        props.className
      )}
    />
  );
};

export default Input;
