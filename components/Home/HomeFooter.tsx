import { Box, Typography } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalActive from "../Modal/ModalActive";
import { UserInfoResponse } from "../../services/service";
import ModalCancelActive from "../Modal/ModalCancelActive";
import { ImageBase } from "../Images";
import { RWebShare } from "react-web-share";
import useTrans from "../../lang/useTrans";
import ModalDefaultBase from "../../components/Modal/components/ModalDefaultBase";
import { ShakeDetectorService } from "../../services/shakeDetector";
import {TStatusShake } from "../../constants";

interface IHomeFooterProps {
  quantityTurn?: number;
  openChest: (data?: any) => void;
  statusShake: string;
  handleRegister: (data?: any) => void;
  handleCancel: (data?: any) => void;
  userInfo?: UserInfoResponse;
  muteAudioBackground?: boolean;
  isOnShake?: boolean;
  setIsOnShake: (data?: any) => void;
}

const HomeFooter: React.FC<IHomeFooterProps> = (props) => {
  const { quantityTurn, openChest, statusShake, handleRegister, handleCancel, userInfo, muteAudioBackground, isOnShake, setIsOnShake } = props;
  const [isOpenModalActive, setIsOpenModalActive] = useState<boolean>(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [isModalCancelSuccess, setIsModalCancelSuccess] = useState<boolean>(false);

  const trans = useTrans();

  const handleModalActive = (data?: any) => {
    setIsOpenModalActive(false);
    handleRegister(data);
  };

  const handleModalCancel = (data?: any) => {
    setIsOpenModalCancel(false);
    if (data) {
      handleCancel(data);
    }
  };

  const videoRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const quantityTurnRef = useRef(quantityTurn); // Tạo ref để lưu trữ giá trị mới nhất

  useEffect(() => {
    quantityTurnRef.current = quantityTurn; // Cập nhật ref khi quantityTurn thay đổi
  }, [quantityTurn]);

  const handleOpenChest = useCallback(() => {
    if (!quantityTurn || quantityTurn < 1) {
      openChest({ totalTurn: 0 })
      return
    }
    if (audioRef && audioRef?.current) {
      audioRef.current.load();
      openChest && openChest();
    }
  }, [openChest]);

  const handleOpenChestRef = useRef(handleOpenChest);

  useEffect(() => {
    if(!isOnShake) {
      alert("on Shake")
      setIsOnShake(true);
      ShakeDetectorService.onShake(() => {
        alert("shake")
        handleOpenChestRef.current();
      });
    }
  });

  useEffect(() => {
    if (videoRef && videoRef?.current) {
      videoRef.current.load();
    }
  }, [statusShake]);
  const handleShare = () => {
    // Check if the browser supports the Web Share API
    // if (navigator.share) {
    //   try {
    //     // Define the data to share
    //     const shareData = {
    //       title: "Example Title",
    //       text: "Check out this website!",
    //       url: "https://example.com"
    //     };

    //     // Call the share() method
    //     await navigator.share(shareData);
    //   } catch (error) {
    //   }
    // } else {
    // }
    return (
      <div>
        <RWebShare
          data={{
            text: "Welcome to Trezò Kache game!",
            url: location.origin,
            title: "Trezò Kache",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button>{trans.Share} 🔗</button>
        </RWebShare>
      </div>
    );
  };
  const stringParts = trans["You have ? turns"].split("{}");
  return (
    <>
      {statusShake === "result" && (
        <audio loop autoPlay>
          <source src={"/audio/audio_open.mp3"} type="audio/mpeg" />
        </audio>
      )}
      <audio ref={audioRef} muted={props.muteAudioBackground} loop autoPlay>
        <source src={"/audio/audio_background.mp3"} type="audio/mpeg" />
      </audio>
      <Box position={"absolute"} bottom={"20px"} width={"100%"}>
        <Box
          mb={"15px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            cursor: "pointer"
          }}
          onClick={handleOpenChest}
        >
          <div className="fixed">
            <ImageBase
              width={300}
              height={300}
              src={
                statusShake === "result"
                  ? "/images/chest-open.gif"
                  : statusShake === "inProgress"
                    ? "/images/chest.gif"
                    : "/images/chest.png"
              } />
          </div>
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mb={"20px"}
          gap={"8px"}
        >
          <Typography
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"19px"}
            color={"#502A00"}
            textAlign={"center"}
          >
            {stringParts[0]}
          </Typography>
          <Typography
            fontSize={"24px"}
            fontWeight={700}
            lineHeight={"29px"}
            color={"#502A00"}
            textAlign={"center"}
            display={"inline-block"}
            sx={{
              textShadow:
                "2px 2px 1px #F8E0AB, 2px -2px 1px #F8E0AB, -2px 2px 1px #F8E0AB, -2px -2px 1px #F8E0AB"
            }}
          >
            {quantityTurn}
          </Typography>
          {stringParts[1] !== undefined && 
          <Typography
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"19px"}
            color={"#502A00"}
            textAlign={"center"}
          >
            {stringParts[1]}
          </Typography>}
        </Box>
        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(193, 131, 62, 0.6) 0%, #A3641E 21.35%, #A3641E 78.65%, rgba(193, 131, 62, 0) 100%, rgba(193, 131, 62, 0.6) 100%),linear-gradient(270deg, rgba(226, 170, 108, 0) 1.33%, #E2AA6C 23.27%, #E2AA6C 76.53%, rgba(226, 170, 108, 0) 101.6%)"
          }}
          height={"40px"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mb={"20px"}
        >
          <Typography
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"14px"}
            color={"#FFFFFF"}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            {trans["Shake your phone or touch the screen to get gifts"]}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"16px"}
          justifyContent={"center"}
        >
          {!userInfo?.premium && <PrimaryButton onClick={() => {
            setIsOpenModalActive(true);
          }}>{trans.Register}</PrimaryButton>}

          {userInfo?.premium && <PrimaryButton onClick={() => {
            setIsOpenModalCancel(true);
          }}>{trans.Cancel}</PrimaryButton>}
          <RWebShare
            data={{
              text: "Welcome to Treasure game!",
              url: 'https://minigame-mps.vercel.app/',
              title: "Treasure",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <PrimaryButton>{trans.Invite}</PrimaryButton>
          </RWebShare>
        </Box>
      </Box>
      <ModalActive
        open={isOpenModalActive}
        handleClose={handleModalActive}
      />
      <ModalCancelActive open={isOpenModalCancel} handleClose={handleModalCancel} setIsModalCancelSuccess={setIsModalCancelSuccess}/>
      <ModalDefaultBase
          title={trans["Cancel Successful"]}
          // description={trans["Cancel Successful"]}
          textConfirm={trans["Confirm"]}
          open={isModalCancelSuccess}
          handleClose={() => setIsModalCancelSuccess(false)}
          handleConfirm={() => setIsModalCancelSuccess(false)}
      />
    </>
  );
};

// const DynamicModalActive = dynamic(() => import("../Modal/ModalActive"));
export default HomeFooter;
