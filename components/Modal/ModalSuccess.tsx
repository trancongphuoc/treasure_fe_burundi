import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Button, DialogActions, DialogContent, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import { ImageBase } from "../Images";
import { useRef, useState } from "react";
import useTrans from "../../lang/useTrans"

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

interface IModalBaseSuccessProps extends DialogProps {
  handleClose?: () => void;
  direction?: "up" | "down" | "left" | "right";
  image?: React.ReactNode | React.ReactElement;
  title?: string;
  description?: string;
  isReceive?: boolean;
  onClickReceive?: () => void;
  onClickShakeMore?: (data: any) => void;
  onChagePlayTurn?: (data: any) => void;
  isChargeTurn: boolean
}

const ModalSuccess: React.FC<IModalBaseSuccessProps> = (props) => {
  const {
    open,
    handleClose,
    children,
    direction = "up",
    title,
    description,
    isReceive,
    image,
    onClickShakeMore,
    onClickReceive,
    isChargeTurn,
    onChagePlayTurn,
    ...dialogProps
  } = props;
  const [videoAvailable1, setVideoAvailable1] = useState(false)
  const [videoAvailable2, setVideoAvailable2] = useState(false)
  const trans = useTrans();
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition as React.ComponentType}
      TransitionProps={
        {
          direction: direction
        } as any
      }
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "100vw",
          margin: "0 auto",
          height: "100%",
          maxHeight: '100%',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "0",
        }
      }}
      onClose={handleClose && handleClose}
      aria-describedby="alert-dialog-slide-description"
      {...dialogProps}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          maxHeight: '100% !important',
          maxWidth: '100% !important',
          opacity: 0.4,
          objectFit: 'cover'
        }}
        onCanPlay={() => {
          setVideoAvailable1(true)
        }}
      >
        <source src={"/video/phaohoa.mp4"} />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          maxHeight: '100% !important',
          maxWidth: '100% !important',
          zIndex: 1,
          opacity: 0.15,
          objectFit: 'cover'
        }}
        onCanPlay={() => {
          setVideoAvailable2(true)
        }}
      >
        <source src={"/video/Xoay.mp4"} />
      </video>
      <Button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          background: 'transparent',
          minWidth: 0,
          width: '40px',
          height: '40px'
        }}
        onClick={handleClose}>
        <ImageBase src={'/images/cancel.png'} width={40} height={40} />
      </Button>
      <DialogContent
        sx={{
          p: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2
        }}
      >
        {(videoAvailable1 || videoAvailable2) && (
          <>
            {image}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#FFFFFF",
                textTransform: "uppercase",
                mt: "24px",
                mb: "7px"
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "29px",
                color: "#FFE47B",
                textTransform: "uppercase",
                textAlign: 'center'
              }}
            >
              {description}
            </Typography>
          </>
        )
        }
      </DialogContent>
      <DialogActions
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          pb: "32px"
        }}
      >
        {(videoAvailable1 || videoAvailable2) && (isReceive ? (
          <PrimaryButton onClick={onClickReceive}>{trans.Received}</PrimaryButton>
        ) : isChargeTurn
          ? <PrimaryButton onClick={onChagePlayTurn}>{trans["Buy more"]}</PrimaryButton>
          : <PrimaryButton onClick={onClickShakeMore}>{trans.Shake}</PrimaryButton>)
        }
      </DialogActions>
    </Dialog>
  );
};
export default ModalSuccess;
