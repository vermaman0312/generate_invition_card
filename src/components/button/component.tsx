import React from "react";
import { Button as CustomButton } from "./ui";
import { IconLoader3 } from "@tabler/icons-react";
import { cn } from "../../utils/cn.util";

type props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({ ...props }: props) => {
  return (
    <CustomButton
      disabled={props.disabled}
      className={cn(
        "w-full p-6 flex items-center justify-center gap-2 bg-[#212529] text-white text-xs rounded-3xl cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <IconLoader3 className="animate-spin" />
      ) : (
        props.children
      )}
    </CustomButton>
  );
};

export default Button;
