import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";

interface IframeComponentProps {
  src: string;
  width?: string;
  height?: string;
  onClose?: () => void; // Hàm đóng iframe
}

const IframeComponent: React.FC<IframeComponentProps> = ({ src, width = "100%", height = "600px", onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" marginTop="16px">
      {/* Nút Đóng */}
      {onClose && (
        <Button variant="contained" color="secondary" onClick={onClose} sx={{ marginBottom: "10px" }}>
          Đóng
        </Button>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        width={width}
        height={height}
        style={{ border: "none", borderRadius: "8px" }}
        title="Verification OTP"
        onLoad={() => setIsLoaded(true)}
      />
    </Box>
  );
};

export default IframeComponent;
