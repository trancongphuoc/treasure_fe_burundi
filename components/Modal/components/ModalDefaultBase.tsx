import ModalBase from "./ModalBase";
import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
import PrimaryButton from "../../Button/PrimaryButton";
import { ImageBase } from "../../Images";

interface IModalNoMoneyProps extends DialogProps {
  handleClose?: () => void;
  title?: string;
  description?: string;
  textConfirm?: string;
  handleConfirm?: () => void;
  image?: "noMoney" | "noChest";
}
const ModalDefaultBase: React.FC<IModalNoMoneyProps> = (props) => {
  const {
    title,
    handleConfirm,
    description,
    textConfirm,
    handleClose,
    image,
    ...dialogProps
  } = props;
  return (
    <ModalBase {...dialogProps} handleClose={handleClose}>
      <DialogContent
        sx={{
          marginTop: image ? "8px" : "20px",
          paddingBottom: "32px",
        }}
      >
        {image && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            mb={"24px"}
          >
            {image === "noMoney" ? (
              <ImageBase
                src={"/images/image-no-money.png"}
                width={64}
                height={64}
              />
            ) : (
              <ImageBase
                src={"/images/no-chest.png"}
                width={64}
                height={64}
              />
            )}
          </Box>
        )}

        <Typography
          fontSize={"18px"}
          fontWeight={700}
          lineHeight={"22px"}
          color={"#502A00"}
          textAlign={"center"}
          mb={"12px"}
        >
          {title}
        </Typography>
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"17px"}
          color={"#502A00"}
          textAlign={"center"}
          mb={"24px"}
          whiteSpace="pre-line"
        >
          {description}
        </Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <PrimaryButton
            typoProps={{
              sx: {
                textTransform: "none",
              },
            }}
            sx={{ width: "100%", maxWidth: "185px" }}
            onClick={handleConfirm && handleConfirm}
          >
            {textConfirm}
          </PrimaryButton>
        </Box>
      </DialogContent>
    </ModalBase>
  );
};
export default ModalDefaultBase;
