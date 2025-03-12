import ModalBase from "./components/ModalBase";
import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import { MpsService, isWebView, SupperApp } from "../../services/service";
import { OtpType } from "../../constants";
import useTrans from "../../lang/useTrans"
import ringme from "ringme-library";

interface IModalActiveProps extends DialogProps {
  handleClose?: (data?: any) => void;
  setIframeUrl?: (data?: any) => void
}

const ModalActive: React.FC<IModalActiveProps> = (props) => {
  const { handleClose, setIframeUrl, ...dialogProps } = props;
  const trans = useTrans();

  const onSubmitRegister = async () => {
    if (isWebView()) {
      let data = await ringme.getUserInfo();
      let dataJson = typeof data === "string" ? JSON.parse(data) : data;
      SupperApp.spGetRegisterUrl(dataJson).then((res) => {
        if(res.code == "200") {
          handleClose({
            type: OtpType.MpsRegisterVerify
          })
          setIframeUrl(res.data);
          // window.location.href = res.data;
        } else {
          handleClose({
            type: OtpType.MpsRegisterVerify,
            res: {status: "FAILED", message: res.message}
          })
        }
      }).catch((err) => {
      });
    } else {
      MpsService.mpsRegister().then((res) => {
        handleClose({
          type: OtpType.MpsRegisterVerify,
          res: res
        })
      }).catch((err) => {
      });
    }
  };
  return (
    <ModalBase {...dialogProps} handleClose={handleClose}>
      <>
        <DialogContent
          sx={{
            marginTop: "20px",
            paddingBottom: "32px"
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
            {trans["Register VIP"]}
          </Typography>

          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"4px"}
            justifyContent={"center"}
            mb={"20px"}
          >
            <Typography
              fontSize={"16px"}
              fontWeight={600}
              lineHeight={"19px"}
              color={"#502A00"}
            >
              {trans["Fee"]}:
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={400}
              lineHeight={"19px"}
              color={"#FFF1AD"}
              padding={"4px 16px"}
              borderRadius={"20px"}
              textTransform={"uppercase"}
              sx={{
                backgroundColor: "#BD843F"
              }}
            >
              {trans["5 TURNS/120 FBU"]}
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={600}
              lineHeight={"19px"}
              color={"#502A00"}
            >
              {trans["/1 day"]}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"8px"}
            justifyContent={"center"}
            mb={"20px"}
          >
            <Typography
              fontSize={"14px"}
              fontWeight={600}
              lineHeight={"17px"}
              color={"#502A00"}
            >
              {trans["Buy more"]}: {trans["5 TURNS/100 FBU"]}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <PrimaryButton
              typoProps={{
                sx: {
                  textTransform: "none"
                }
              }}
              sx={{ width: "100%", maxWidth: "185px" }}
              onClick={onSubmitRegister}
            >
              {trans["Register VIP"]}
            </PrimaryButton>
          </Box>
        </DialogContent>
      </>
    </ModalBase>
  );
};
export default ModalActive;
