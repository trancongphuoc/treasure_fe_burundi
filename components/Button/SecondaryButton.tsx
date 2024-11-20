import Button, { ButtonProps } from "@mui/material/Button";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography, TypographyProps } from "@mui/material";

interface IButtonProps extends ButtonProps {
  typoProps?: TypographyProps;
}

const StyleButton = styled(Button)<ButtonProps>(({}) => ({
  background: "linear-gradient(180deg, #8F5900 53.12%, #B57A30 100%);",
  borderRadius: "24px",
  position: "relative",
  zIndex: 1,
  height: "42px",
  ".MuiTouchRipple-root": {
    display: "none",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "calc(100% - 4px)",
    background:
      "linear-gradient(0deg, #BD843F, #BD843F),\n" +
      "linear-gradient(180deg, #DFA55E 0%, #F5B567 100%)",

    borderRadius: "24px",
    bottom: "6px",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    background: "linear-gradient(180deg, #DFA55E 0%, #F5B567 100%)",

    borderRadius: "24px",
    bottom: "4px",
  },
}));
const SecondaryButton: React.FC<IButtonProps> = (props) => {
  const { typoProps, ...btnProps } = props;

  return (
    <StyleButton {...btnProps}>
      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: 700,
          color: "#FFF3B4",
          position: "absolute",
          top: "7px",
          ...typoProps?.sx,
        }}
      >
        {props.children}
      </Typography>
    </StyleButton>
  );
};
export default SecondaryButton;
