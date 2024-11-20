import ModalBase from "./components/ModalBase";
import React, { useRef, useState } from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, TextField, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import TextFieldBase from "../TextField/TextFieldBase";
import useTrans from "../../lang/useTrans"

interface IModalPhoneNumberProps extends DialogProps {
  handleClose: (value: any) => void;
}
const ModalPhoneNumber: React.FC<IModalPhoneNumberProps> = (props) => {
  const { handleClose, ...dialogProps } = props;
  const trans = useTrans();

  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {

    // const value = event.target.value;
    // if (isNaN(value)) {
    //   return;
    // }
    // setPhoneNumber((prevOtp) => {
    //   const updatedOtp = [...prevOtp];
    //   updatedOtp[index] = value;
    //   return updatedOtp;
    // });

    // if (value !== "") {
    //   focusNextInput(index);
    // } else {
    //   focusPreviousInput(index);
    // }
  };

  const focusNextInput = (index) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && phoneNumber[index] === "") {
      focusPreviousInput(index);
    }
  };

  return (
    <ModalBase {...dialogProps} removeCloseIcon={true}>
      <>
        <DialogContent
          sx={{
            marginTop: "20px",
            paddingBottom: "32px",
          }}
        >
          <Typography
            fontSize={"18px"}
            fontWeight={700}
            lineHeight={"22px"}
            color={"#502A00"}
            textAlign={"center"}
            mb={"12px"}
          >
            {trans["Enter phone number"]}
          </Typography>
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"17px"}
            color={"#502A00"}
            textAlign={"center"}
            mb={"12px"}
            whiteSpace="pre-line"
          >
            {trans["Enter phone number, please"]}
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"3px"}
            justifyContent={"center"}
            mb={"24px"}
          >
            <TextFieldBase
              autoComplete="off"
              focused
              size={"medium"}
              sx={{
                width: "100%",
              }}
              inputProps={{
                inputMode: "numeric",
                autoFocus: true,
                style: {
                  textAlign: 'center'
                }
              }}
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value)
              }}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <PrimaryButton
              typoProps={{
                sx: {
                  textTransform: "none",
                },
              }}
              sx={{ width: "100%", maxWidth: "185px" }}
              onClick={() => {
                handleClose({
                  value: phoneNumber
                })
                setPhoneNumber('')
              }}
            >
              {trans.Confirm}
            </PrimaryButton>
          </Box>
        </DialogContent>
      </>
    </ModalBase>
  );
};
export default ModalPhoneNumber;
