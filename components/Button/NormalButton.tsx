import Button, { ButtonProps } from "@mui/material/Button";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

interface IButtonProps extends ButtonProps { }

const StyleButton = styled(Button)<ButtonProps>(({ }) => ({
  background:
    "linear-gradient(180deg, #FFC582 0%, #CD6624 100%),\n" +
    "linear-gradient(0deg, rgba(152, 69, 18, 0.8), rgba(152, 69, 18, 0.8))",
  position: "relative",
  borderRadius: "30px",
  zIndex: 1,
  height: "36px",
  color: "#FFF1AD",
  ".MuiTouchRipple-root": {
    display: "none",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: "calc(100% - 4px)",
    height: "calc(100% - 4px)",
    background: "rgba(152, 69, 18, 0.8)",
    borderRadius: "30px",
    zIndex: "-1",
  },
  "&:hover": {
    border: "none",
    background:
      "linear-gradient(180deg, #FFC582 0%, #CD6624 100%),\n" +
      "linear-gradient(0deg, rgba(152, 69, 18, 0.8), rgba(152, 69, 18, 0.8))",
  },
}));
const NormalButton: React.FC<IButtonProps> = (props) => {
  return (
    <StyleButton {...props}>
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: 700,
          color: "#FFF1AD",
          textShadow: "1px 1px 0px #571A07",
          display: 'flex'
        }}
      >
        {props.children}
      </Typography>
    </StyleButton>
  );
};
export default NormalButton;
