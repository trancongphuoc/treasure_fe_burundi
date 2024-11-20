import Button, { ButtonProps } from "@mui/material/Button";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography, TypographyProps } from "@mui/material";

interface IButtonProps extends ButtonProps {
  typoProps?: TypographyProps;
}

const StyleButton = styled(Button)<ButtonProps>(({}) => ({
  background: "linear-gradient(180deg, #8F5900 53.12%, #B57A30 100%)",
  borderRadius: "24px",
  width: "152px",
  position: "relative",
  zIndex: 1,
  height: "42px",
  "&.active": {
    background: "linear-gradient(180deg, #8F5900 53.12%, #B57A30 100%)",
  },
  ".MuiTouchRipple-root": {
    display: "none",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "calc(100% - 4px)",
    background:
      "linear-gradient(180deg, #FFC300 0%, #FFB560 0.01%, #FFE46F 100%)",
    borderRadius: "24px",
    bottom: "6px",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    background: "linear-gradient(180deg, #FFCB82 0%, #FFEEB3 100%)",
    borderRadius: "24px",
    bottom: "4px",
  },
}));
const PrimaryButton: React.FC<IButtonProps> = (props) => {
  const { typoProps, ...btnProps } = props;
  return (
    <StyleButton {...btnProps}>
      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: 700,
          color: "#502A00",
          position: "absolute",
          top: "7px",
          textShadow:
            "1px 1px 2px #FFD282, 1px -1px 2px #FFD282, -1px 1px 2px #FFD282, -1px -1px 2px #FFD282",

          ...typoProps?.sx,
        }}
      >
        {props.children}
      </Typography>
    </StyleButton>
  );
};
export default PrimaryButton;
