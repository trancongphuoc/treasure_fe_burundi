import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton } from "@mui/material";
import { ImageBase } from "../../Images";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
    direction?: "up" | "down" | "left" | "right";
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide direction={props.direction} ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

interface IModalBaseProps extends DialogProps {
  handleClose?: (data?: any) => void;
  direction?: "up" | "down" | "left" | "right";
  heightModal?: string;
  removeCloseIcon?: boolean
}
const ModalBase: React.FC<IModalBaseProps> = (props) => {
  const {
    open,
    handleClose,
    children,
    heightModal = "auto",
    direction = "up",
    removeCloseIcon,
    ...dialogProps
  } = props;
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition as React.ComponentType}
      TransitionProps={
        {
          direction: direction,
        } as any
      }
      keepMounted
      onClose={handleClose && handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: {
          position: "relative",
          width: "345px",
          background:
            "linear-gradient(180deg, #FFC36F 1.04%, #FFFFC5 100%),linear-gradient(0deg, #FFF1AD, #FFF1AD)",
          borderRadius: "16px",
          border: "3px solid #FFF1AD",
          overflowY: "unset",
          margin: "0 auto",
          height: heightModal,
          maxHeight: "517px",
        },
      }}
      {...dialogProps}
    >
      {!props.removeCloseIcon && <IconButton
        sx={{
          padding: 0,
          "&:hover": { backgroundColor: "transparent" },
          position: "absolute",
          right: "-8px",
          top: "-8px",
          zIndex: 9999
        }}
        onClick={() => { handleClose(null) }}
      >
        <ImageBase src={"/images/cancel.png"} width={48} height={48} />
      </IconButton>}
      {children}
    </Dialog>
  );
};
export default ModalBase;
