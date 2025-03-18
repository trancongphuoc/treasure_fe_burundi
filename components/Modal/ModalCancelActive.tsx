import ModalBase from "./components/ModalBase";
import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { MpsService, SupperApp, isWebView } from "../../services/service";
import { OtpType } from "../../constants";
import useTrans from "../../lang/useTrans";
import ringme from "ringme-library";

interface IModalCancelActiveProps extends DialogProps {
  handleClose?: (data?: any) => void;
  setIsModalCancelSuccess?: any;
  setIframeUrl?: (data?: any) => void;
}
const ModalCancelActive: React.FC<IModalCancelActiveProps> = (props) => {
  const { handleClose, setIframeUrl, setIsModalCancelSuccess, ...dialogProps } = props;
  const trans = useTrans();
  const onSubmitCancel = async () => {
    if (isWebView()) {
      let data = await ringme.getUserInfo();
      let dataJson = typeof data === "string" ? JSON.parse(data) : data;
      SupperApp.spCancel(dataJson).then((res) => {
        if(res.code == "200") {
          setIframeUrl(res.data);
          handleClose({
            type: OtpType.MpsCancelVerify,
          })
          // window.location.href = res.data;
        } else {
          handleClose({
            type: OtpType.MpsCancelVerify,
            res: {status: "FAILED", message: res.message}
          })
        }
      }).catch((err) => {
      });
    } else {
      MpsService.mpsCancel().then((res) => {
        handleClose({
          type: OtpType.MpsCancelVerify,
        })

        if (res.status == "OK") {
          setIsModalCancelSuccess(true)
        }
      }).catch((err) => {
      });
    }
  };
  return (
    <ModalBase {...dialogProps} handleClose={handleClose}>
      <>
        <DialogContent
          sx={{
            marginTop: "40px",
            paddingBottom: "32px",
          }}
        >
          <Typography
            fontSize={"18px"}
            fontWeight={700}
            lineHeight={"22px"}
            color={"#502A00"}
            textAlign={"center"}
            mb={"24px"}
            whiteSpace={"pre-line"}
          >
            {trans["Do you want to cancel VIP?"]}
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"16px"}
            justifyContent={"center"}
          >
            <SecondaryButton
              typoProps={{
                sx: {
                  textTransform: "uppercase",
                },
              }}
              sx={{ width: "100%" }}
              onClick={onSubmitCancel}
            >
              {trans.Yes}
            </SecondaryButton>
            <PrimaryButton
              typoProps={{
                sx: {
                  textTransform: "uppercase",
                },
              }}
              sx={{ width: "100%" }}
              onClick={() => {
                handleClose(null)
              }}
            >
              {trans.No}
            </PrimaryButton>
          </Box>
        </DialogContent>
      </>
    </ModalBase>
  );
};
export default ModalCancelActive;
