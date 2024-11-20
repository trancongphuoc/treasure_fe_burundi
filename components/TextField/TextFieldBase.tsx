import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type ITextFieldBaseProps = TextFieldProps & {
  inputSize?: "small" | "medium";
};
const TextFieldBase: React.FC<ITextFieldBaseProps> = (props) => {
  const { inputSize, ...textFieldProps } = props;
  const styleBase = {
    background: "#FFC774",
    borderRadius: "12px",
    height: "40px",
    color: "#502A00",
    fontWeight: 500,
    width: "100%",
    "& > fieldset": {
      border: "2px solid #F2AF4C",
    },
    "&.Mui-focused": {
      "& > fieldset": {
        border: "2px solid #502A00",
      },
    },
    ":hover": {
      "& > fieldset": {
        border: "2px solid #502A00",
      },
    },
  };

  const styleSmall = {
    ".MuiOutlinedInput-root": {
      ...styleBase,
      fontSize: "20px",
      lineHeight: "24px",
    },
    ".MuiOutlinedInput-input": {
      height: "40px",
      padding: "0 14px",
    },
  };
  const styleMedium = {
    ".MuiOutlinedInput-root": {
      ...styleBase,
      fontSize: "24px",
      lineHeight: "29px",
    },
    ".MuiOutlinedInput-input": {
      height: "40px",
      padding: "0 13.5px",
    },
  };
  let style;
  switch (inputSize) {
    case "small":
      style = styleSmall;
      break;
    case "medium":
      style = styleMedium;
      break;
    default:
      style = styleSmall;
      break;
  }
  return (
    <TextField {...textFieldProps} sx={{ ...style, ...textFieldProps.sx }} />
  );
};
export default TextFieldBase;
