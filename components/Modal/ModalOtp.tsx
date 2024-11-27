import ModalBase from "./components/ModalBase";
import React, { useRef, useState } from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, Button, DialogContent, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import TextFieldBase from "../TextField/TextFieldBase";
import { AuthService } from "../../services/service";
import useTrans from "../../lang/useTrans"
interface IModalOtpProps extends DialogProps {
  type: any
  phoneNumber?: string
  handleClose: (value: any) => void;
  errorMessage?: string
}
const ModalOtp: React.FC<IModalOtpProps> = (props) => {
  const { type, phoneNumber, handleClose, errorMessage, ...dialogProps } = props;
  const trans = useTrans();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    if (isNaN(value)) {
      return;
    }

    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      updatedOtp[index] = value;
      return updatedOtp;
    });

    if (value !== "") {
      focusNextInput(index);
    } else {
      focusPreviousInput(index);
    }
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
    if (event.key === "Backspace" && otp[index] === "") {
      focusPreviousInput(index);
    }
  };

  const onResendOtp = () => {
    AuthService.sendOtp({
      body: {
        phone: props.phoneNumber
      }
    }).then(() => {
      setOtp(["", "", "", "", "", ""])
    })
  }
  return (
    <ModalBase {...dialogProps} handleClose={handleClose}>
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
            {trans["Enter OTP"]} 
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
            {`${trans["Please enter the OTP code sent to phone number"]} ${props.phoneNumber}`}
          </Typography>
          {errorMessage && 
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"17px"}
            color={"#502A00"}
            textAlign={"center"}
            mb={"12px"}
            whiteSpace="pre-line"
            sx={{ color: "#FF0000" }}
          >
            {errorMessage}
          </Typography>
          }
          
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"8px"}
            justifyContent={"center"}
            mb={"24px"}
          >
            {otp.map((value, index) => (
              <TextFieldBase
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                size={"medium"}
                sx={{ width: "40px" }}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric"
                }}
                value={value}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                autoFocus={index === 0}
              />
            ))}
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button
              sx={{
                background: 'transparent',
                border: 'none',
                color: "#502A00",
                paddingBottom: '15px',
                fontWeight: 600
              }}
              onClick={onResendOtp}>
              {trans["Resend OTP?"]}
            </Button>
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
                  type: props.type,
                  value: otp
                })
                setOtp(["", "", "", "", "", ""])
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
export default ModalOtp;
