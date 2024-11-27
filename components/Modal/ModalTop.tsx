import ModalBase from "./components/ModalBase";
import React, { useEffect } from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { ImageBase } from "../Images";
import useTrans from "../../lang/useTrans"

interface IUser {
  id?: number;
  phone?: string;
  addTime?: string;
  totalStar?: number;
}
interface IModalTopProps extends DialogProps {
  handleClose?: () => void;
  dataHistory?: IUser[];
}
const ModalTop: React.FC<IModalTopProps> = (props) => {
  const { handleClose, dataHistory, ...dialogProps } = props;
  const trans = useTrans();
  return (
    <ModalBase
      {...dialogProps}
      heightModal={"517px"}
      direction={"left"}
      handleClose={handleClose}
    >
      <DialogTitle sx={{ padding: "32px 24px 16px" }}>
        <Typography
          fontSize={"18px"}
          fontWeight={700}
          lineHeight={"22px"}
          color={"#502A00"}
        >
          {trans.Rank}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          paddingLeft: "24px",
          paddingRight: "12px",
          overflow: "auto",
          marginBottom: "8px",
          marginRight: "12px",
          "&::-webkit-scrollbar": {
            width: "4px",
            backgroundColor: "#F2AF4C",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#502A00",
            borderRadius: "2px",
            height: "300px",
            borderRight: "10px solid rgba(0, 0, 0, 1)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "2px",
            backgroundColor: "#F2AF4C",
          },
        }}
      >
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            // paddingY={"12px"}
            borderBottom={"1px solid #FFFFFF"}
            sx={{
              ":last-child": {
                borderBottom: "none",
              },
            }}
            // marginBottom={"10px"}
          >

            <Box display={"flex"}  gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {trans["No."]}
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {trans.Phone}
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {trans.Gold}
                </Typography>
            </Box>
          </Box>
        
        {dataHistory?.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingY={"12px"}
            borderBottom={"1px solid rgba(123, 65, 0, 1)"}
            sx={{
              ":last-child": {
                borderBottom: "none",
              },
            }}
          >
            <Box display={"flex"} paddingLeft={"5px"} gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {index + 1}
                </Typography>
            </Box>

            <Box display={"flex"} justifyContent={"center"} gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {item.phone}
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} gap={"12px"} flex={1}>
              <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {item.totalStar}
                </Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </ModalBase>
  );
};
export default ModalTop;
