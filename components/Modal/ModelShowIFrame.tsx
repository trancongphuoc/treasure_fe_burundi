import ModalBase from "./components/ModalBase";
import React, { useEffect, useRef, useState } from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Button, Box, DialogContent, TextField, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import TextFieldBase from "../TextField/TextFieldBase";
import useTrans from "../../lang/useTrans"

interface IModalShowIframProps extends DialogProps {
  src: string;
  onClose?: () => void; // Hàm đóng iframe
}
const ModelShowIframe: React.FC<IModalShowIframProps> = (props) => {
  const { src, onClose, ...dialogProps } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("Iframe URL:", src);
  useEffect(() => {
    const checkIframe = setInterval(() => {
      if (iframeRef.current && !document.body.contains(iframeRef.current)) {
        console.log("Iframe đã bị xóa khỏi DOM");
        onClose?.(); // Gọi hàm đóng nếu iframe bị xóa
      }
    }, 1000);

    return () => clearInterval(checkIframe);
  }, []);


  return (
    <ModalBase PaperProps={{
      sx: {
        position: "relative",
        width: "345px",
        borderRadius: "16px",
        border: "none",
        overflowY: "unset",
        margin: "0 auto",
        height: "auto",
        maxHeight: "517px",
      },
    }}
      {...dialogProps} removeCloseIcon={false} handleClose={onClose}>
      <DialogContent style={{ padding: "0 0 0 0", margin: "0 0 0 0" }} >
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          {/* Iframe */}
          <iframe
            ref={iframeRef}
            src={src}
            width={"100%"}
            height={"600px"}
            style={{ border: "none", borderRadius: "8px" }}
            title="Verification OTP"
            onLoad={() => setIsLoaded(true)}
          />
        </Box>
      </DialogContent>
    </ModalBase>
  );
};
export default ModelShowIframe;
