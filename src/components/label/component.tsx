import React from "react";
import { Label as CustomLabel } from "./ui";
import { cn } from "../../utils/cn.util";

type props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Label = ({ ...props }: props) => {
  return (
    <CustomLabel className={cn("", props.className)} onClick={props.onClick}>
      {props.children}
    </CustomLabel>
  );
};

export default Label;
