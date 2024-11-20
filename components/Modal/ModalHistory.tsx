import ModalBase from "./components/ModalBase";
import React, { useEffect } from "react";
import { DialogProps } from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { ImageBase } from "../Images";
import useTrans from "../../lang/useTrans"

interface IDataHistory {
  id?: string;
  title?: string;
  time?: string;
  date?: string;
  price?: string;
  image?: string;
}
interface IModalHistoryProps extends DialogProps {
  handleClose?: () => void;
  dataHistory?: IDataHistory[];
}
const ModalHistory: React.FC<IModalHistoryProps> = (props) => {
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
          {trans.History}
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
        {dataHistory?.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingY={index !== 0 ? "12px" : 0}
            borderBottom={"1px solid rgba(123, 65, 0, 1)"}
            sx={{
              ":last-child": {
                borderBottom: "none",
              },
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={"12px"} flex={1}>
              <Box>
                <ImageBase
                  src={item.image}
                  width={40}
                  height={40}
                />
              </Box>
              <Box>
                <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  lineHeight={"17px"}
                  color={"#502A00"}
                  mb={"4px"}
                >
                  {item?.title}
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  lineHeight={"14px"}
                  color={"#502A00"}
                  sx={{
                    opacity: "0.6",
                  }}
                >
                  {`${item?.time} | ${item?.date}`}
                </Typography>
              </Box>
            </Box>

            <Typography
              fontSize={"18px"}
              fontWeight={500}
              lineHeight={"22px"}
              color={"#502A00"}
            >
              {item.id != "UNLUCKY" && item?.price}
            </Typography>
          </Box>
        ))}
      </DialogContent>
    </ModalBase>
  );
};
export default ModalHistory;
