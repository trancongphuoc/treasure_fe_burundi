import { Box, IconButton } from "@mui/material";
import NormalButton from "../Button/NormalButton";
import ModalInfo from "../Modal/ModalInfo";
import ModalHistory from "../Modal/ModalHistory";
import { AboutIcon, InfoIcon, XMarkIcon, VolumeUp, VolumeOff } from "../Icons";
import React, { useCallback, useState } from "react";
import { PlayService, AuthService } from "../../services/service";
import { getImageSuccessModal } from "../../utils";
import { format } from "date-fns";
import { ImageBase } from "../Images";
import useTrans from "../../lang/useTrans";
import { StorageKey } from "../../constants";
import { log } from "console";

interface IHomeHeaderProps {
  totalStar?: number;
  muteAudioBackground: () => void;
  phoneNumber?: string
}
const data = [
  {
    id: "1",
    title: "Tiền HTG",
    time: "10:00",
    price: "+400",
    date: "22/05.2023",
    image: "as",
  },
];
const HomeHeader: React.FC<IHomeHeaderProps> = (props) => {
  const { totalStar, muteAudioBackground, phoneNumber } = props;

  const [isOpenModalInfo, setIsOpenModalInfo] = useState<boolean>(false);
  const [isOpenModalHistory, setIsOpenModalHistory] = useState<boolean>(false);
  const [dataHistory, setDataHistory] = useState<any>([]);
  const [muteAudioBg, setMuteAudioBg] = useState<boolean>(false);

  const trans = useTrans();
  
  const handleModalInfo = useCallback(() => {
    setIsOpenModalInfo(!isOpenModalInfo);
  }, [isOpenModalInfo]);

  const handleModalHistory = () => {
    if (!isOpenModalHistory) {
      PlayService.playHistory().then((res) => {
        const _historyData = res?.reduce((arr, item, index) => {
          arr.push({
            id: item.gift?.id,
            title: item.gift?.name || '',
            time: format(new Date(item.addTime), 'HH:mm'),
            date: format(new Date(item.addTime), 'dd/MM/yyyy'),
            price: '+' + item.gift?.noItem,
            image: getImageSuccessModal(item.gift?.id)
          })
          return arr
        }, [])
        setDataHistory(_historyData)
        setIsOpenModalHistory(!isOpenModalHistory);
      })
        .catch((err) => {
          setDataHistory([])
        })
    } else
      setIsOpenModalHistory(!isOpenModalHistory);
  };

  const logout = () => {
    localStorage.removeItem(StorageKey.accessToken);
    AuthService.logout();
    window.location.reload();
  }

  return (
    <>
      <Box
        px={"12px"}
        py={"6px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"8px"}>
          <NormalButton
            sx={{
              ".MuiButton-startIcon": { marginRight: "4px" },
            }}
            onClick={logout}
            startIcon={<XMarkIcon />}
          >
            {trans.Logout}
          </NormalButton>
          <NormalButton
            sx={{ minWidth: "88px", px: "8px" }}
            startIcon={
              <img
                src="/images/icon-star.png"
                alt={"icon"}
                width={24}
                height={24}
              />
            }
          >
            {totalStar}
          </NormalButton>
          <NormalButton
            sx={{ minWidth: "35px" }}
            onClick={() => {
              props.muteAudioBackground()
              setMuteAudioBg(!muteAudioBg)
            }}
          >
            {muteAudioBg
              ? <VolumeOff />
              : <VolumeUp />}
          </NormalButton>
          {phoneNumber && (
            <NormalButton sx={{ minWidth: "88px", px: "8px" }}>
              {phoneNumber.startsWith("257") ? phoneNumber.slice(3) : phoneNumber}
            </NormalButton>
          )}

        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"16px"}>
          <IconButton
            sx={{
              padding: 0,
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={handleModalInfo}
          >
            <InfoIcon />
          </IconButton>
          <IconButton
            sx={{
              padding: 0,
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={handleModalHistory}
          >
            <AboutIcon />
          </IconButton>
        </Box>
      </Box>
      <ModalInfo open={isOpenModalInfo} handleClose={handleModalInfo} />
      <ModalHistory
        open={isOpenModalHistory}
        handleClose={handleModalHistory}
        dataHistory={dataHistory}
      />
    </>
  );
};

export default HomeHeader;
