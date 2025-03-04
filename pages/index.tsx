import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/material";
import ringme from "ringme-library";
import HomeFooter from "../components/Home/HomeFooter";
import HomeHeader from "../components/Home/HomeHeader";
import HexTileLayout from "../components/Home/HexTileLayout"
import ModalDefaultBase from "../components/Modal/components/ModalDefaultBase";
import ModalOtp from "../components/Modal/ModalOtp";
import ModalSuccess from "../components/Modal/ModalSuccess";
import { ImageBase } from "../components/Images";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import ModalCancelActive from "../components/Modal/ModalCancelActive";
import { useRouter } from "next/router";
import { AuthService, MpsService, PlayService, UserInfoResponse, SupperApp, isWebView } from "../services/service";
import { OtpType, StorageKey, TStatusShake } from "../constants";
import axios, { AxiosRequestConfig } from "axios";
import { serviceOptions } from "../services/serviceOptions";
import { ShakeDetectorService } from "../services/shakeDetector";
import { getImageSuccessModal } from "../utils";
import ModalPhoneNumber from "../components/Modal/ModalPhoneNumber";
import useTrans from "../lang/useTrans";
import { da, vi } from "date-fns/locale";
const Shake = require('shake.js');
const Qs = require("qs");

interface IDataSuccessShake {
  title?: string;
  description?: string;
  image?: string;
}

const fakeApi: any = () => {
  return new Promise((resolve) => {
    // setTimeout(() => {
    //   resolve({
    //     data: {
    //       title: "CHÚC MỪNG BẠN ĐÃ TRÚNG",
    //       description: "+5 HTG",
    //       image: "/images/image-money.png",
    //     },
    //   });
    // }, 1000);
  });
};
export type TStatusShake = "inProgress" | "result" | "done";

const Home: NextPage = () => {
  const router = useRouter();
  const [statusShake, setStatusShake] = useState<string>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const [userInfo, setUserInfo] = useState<UserInfoResponse>(null);
  const [otpType, setOtpType] = useState<string>(null);
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [openPhoneNumber, setOpenPhoneNumber] = useState<boolean>(false);
  const [refreshUserInfo, setRefreshUserInfo] = useState<boolean>(false);

  const [isModalRegisterSuccess, setIsModalRegisterSuccess] = useState<boolean>(false);
  const [isModalCancelSuccess, setIsModalCancelSuccess] = useState<boolean>(false);
  const [isModalCharge, setIsModalCharge] = useState<boolean>(false);
  const [isModalEnoughMoney, setIsModalEnoughMoney] = useState<boolean>(false);

  const [isModalShakeSuccess, setIsModalShakeSuccess] = useState<boolean>(false);
  const [dataSuccessShake, setDataSuccessShake] = useState<IDataSuccessShake>();
  const [isChargeTurn, setIsChargeTurn] = useState<boolean>(false);
  const [isOnShake, setIsOnShake] = useState<boolean>(false);
  const [backSuperApp, setBackSuperApp] = useState<boolean>(false);

  const [muteAudioBg, setMuteAudioBg] = useState<boolean>(false);
  const trans = useTrans();
  const handleStatusShake = (status: TStatusShake) => {
    setStatusShake(status);
  };

  const videoRef = useRef<any>(null);
  const audioRef = useRef<any>(null);


  // const isWebView = () => {
  // 	const navigator = window.navigator;
  // 	const userAgent = navigator.userAgent;
  // 	const normalizedUserAgent = userAgent.toLowerCase();
  // 	const standalone = (navigator as any).standalone;

  // 	const isIos = /ip(ad|hone|od)/.test(normalizedUserAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  // 	const isAndroid = /android/.test(normalizedUserAgent);
  // 	const isSafari = /safari/.test(normalizedUserAgent);
  // 	const isWV = (isAndroid && /; wv\)/.test(normalizedUserAgent)) || (isIos && !standalone && !isSafari);

  // 	const osText = isIos ? 'iOS' : isAndroid ? 'Android' : 'Other';
  // 	const webviewText = isWV ? 'Yes' : 'No';
  //   console.log(`OS: ${osText}, Is WebView: ${webviewText}`);
  //   return isWV;
  // }

  useEffect(() => {
    // Kiểm tra xem có phải WebView không
    if (router.isReady) {
      if (isWebView()) {
        setBackSuperApp(true);
        // let data = await ringme.getUserInfo();
        // alert(data)

        ringme.getUserInfo()
          .then(data => {
            alert(JSON.stringify(data, null, 2));

            if (!data) return;
            axios.post('api/auth/verify_supper_app', { token: data.token, msisdn: data.userId }, {
              baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
              timeout: 60000, // 1 phút
              paramsSerializer: (params) =>
                Qs.stringify(params, { arrayFormat: 'repeat' }),
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            })
              .then((res) => {
                localStorage.setItem(StorageKey.accessToken, router.query?.token as string);
                const axiosConfig: AxiosRequestConfig = {
                  baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
                  timeout: 60000, // 1 phút
                  paramsSerializer: (params) =>
                    Qs.stringify(params, { arrayFormat: "repeat" }),
                  headers: {
                    Authorization: `Bearer ${res.data?.accessToken}`,
                    "Access-Control-Allow-Origin": "*"
                  }
                };
                serviceOptions.axios = axios.create(axiosConfig);
                setRefreshUserInfo(true)
              }).catch(err => {
                setOpenPhoneNumber(true)
              });
          })
          .catch(error => {
            alert("Lỗi khi lấy dữ liệu người dùng: " + JSON.stringify(error));
          });


      } else {
        if (serviceOptions.axios) {
          AuthService.userInfo().then((res) => {
            setUserInfo(res);
            if (res?.isWin) {
              setStatusShake(TStatusShake.result);
              setDataSuccessShake({
                title: trans.Congratulations,
                description: trans["You are the player..."],
                image: "/images/money-default.svg"
              });
              setTimeout(() => {
                setIsModalShakeSuccess(true)
              }, 1500);
            }
          })
            .catch(err => {
              setOpenPhoneNumber(true)
            });
        } else {
          axios.post('api/user/info', null, {
            baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
            timeout: 60000, // 1 phút
            paramsSerializer: (params) =>
              Qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem(StorageKey.accessToken)}`,
              'Access-Control-Allow-Origin': '*',
            }
          })
            .then((res) => {
              setUserInfo(res.data);
              if (res?.data?.isWin) {
                setStatusShake(TStatusShake.result);
                setDataSuccessShake({
                  title: trans.Congratulations,
                  description: trans["You are the player..."],
                  image: "/images/money-default.svg"
                });
                setTimeout(() => {
                  setIsModalShakeSuccess(true)
                }, 1500);
              }
            }).catch(err => {
              setOpenPhoneNumber(true)
            });
        }
      }
    }
  }, [router]);

  useEffect(() => {
    // Tạm dừng hoặc phát lại âm thanh khi trạng thái trang thay đổi
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        audioRef.current.pause();
      } else if (document.visibilityState === "visible") {
        audioRef.current.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Xóa sự kiện và dừng âm thanh khi component unmount
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset thời gian phát
    };
  }, []);

  useEffect(() => {
    if (refreshUserInfo) {
      AuthService.userInfo().then((res) => {
        setUserInfo(res);
        // setRefreshUserInfo(false)
        // if (res?.isWin) {
        //   setStatusShake(TStatusShake.result);
        //   setDataSuccessShake({
        //     title: "Felisitasyon, ou genyen",
        //     description: "Ou se 2em jwe ki gen plis etwal jodi a. Se pou w se premye jwe ki gen plis etwal pou w ka jwenn 20 HTG ",
        //     image: "/images/image-money-default.png"
        //   });
        //   setTimeout(() => {
        //     setIsModalShakeSuccess(true)
        //   }, 1500);
        // }
      })
        .catch()
    }
    setRefreshUserInfo(false)
  }, [refreshUserInfo])

  const openChest = async (data) => {
    if (data?.totalTurn === 0) {
      setIsModalCharge(true)
      return
    }

    if (statusShake === TStatusShake.inProgress) {
      return;
    }

    setStatusShake(TStatusShake.inProgress);
    setIsModalShakeSuccess(false)
    setIsChargeTurn(false)
    PlayService.playRun()
      .then((res) => {
        setTimeout(() => {
          setStatusShake(TStatusShake.result);
          setDataSuccessShake({
            title: res.status === "OK" ? (res?.gift.id !== "UNLUCKY" ? trans.Congratulations : "") : trans.Retry,
            description: res?.gift?.name || res?.message || "",
            image: res.status === "OK" ? getImageSuccessModal(res?.gift?.id) : ""
          });
          if (res.status === "OK") {
            setUserInfo({
              ...userInfo,
              totalPlay: userInfo.totalPlay - 1,
              totalStar: res?.gift?.id?.includes("STAR")
                ? userInfo.totalStar + (res?.gift?.noItem || 0)
                : userInfo.totalStar
            });
          } else {
            if (userInfo.totalPlay < 1)
              setIsChargeTurn(true)
          }
          setTimeout(() => {
            setIsModalShakeSuccess(true)
          }, 3000);
        }, 1500)
      })
      .catch((err) => {
        setTimeout(() => {
          setStatusShake(TStatusShake.result);
          setDataSuccessShake({
            title: trans.Retry,
            description: "",
            image: '/images/cancel.png'
          });
          setTimeout(() => {
            setIsModalShakeSuccess(true)
          }, 3000);
        }, 1500);
      });
    // try {
    //   const result = await fakeApi();
    //   setDataSuccessShake(result?.data);
    // } catch (e) {
    // } finally {
    //   setStatusShake("result");
    // }
  };

  const handleRegister = (data: any) => {
    if (!localStorage.getItem(StorageKey.accessToken)?.length) {
      setOpenPhoneNumber(true)
    } else
      if (data?.type) {
        // setOtpType(data?.type);
        // setOpenOtp(true);
        if (data?.res.status != "OK") {
          setIsModalEnoughMoney(true);
        } else {
          setRefreshUserInfo(true)
          setIsModalRegisterSuccess(true);
        }

      }
  };

  const handleCancel = (data: any) => {
    if (data?.type) {
      // setOtpType(data?.type);
      // setOpenOtp(true);
      setRefreshUserInfo(true)
    }
  };

  const onSubmitOtp = (data: any) => {
    ShakeDetectorService.initialize();
    setOpenOtp(false);
    setOtpType(null);
    switch (data?.type) {
      case OtpType.UserVerify:
        AuthService.verifyOtp({
          body: {
            phone: phoneNumber,
            otp: data.value?.join("")
          }
        }).then((res) => {
          if (res?.accessToken) {
            localStorage.setItem(StorageKey.accessToken, res.accessToken);
            const axiosConfig: AxiosRequestConfig = {
              baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
              timeout: 60000, // 1 phút
              paramsSerializer: (params) =>
                Qs.stringify(params, { arrayFormat: "repeat" }),
              headers: {
                Authorization: `Bearer ${localStorage.getItem(StorageKey.accessToken)}`,
                "Access-Control-Allow-Origin": "*"
              }
            };
            serviceOptions.axios = axios.create(axiosConfig);
            setRefreshUserInfo(true)
            window.location.reload()
          } else {
            setOtpType(data?.type);
            setErrorMessage(res.message)
            setOpenOtp(true);
          }
        })
          .catch(err => {
            setErrorMessage("Kode OTP siyo, subira muyisubizemwo")
            setOtpType(data?.type);
            setOpenOtp(true);
          });
        break;
      case OtpType.MpsRegisterVerify:
        MpsService.mpsVerifyRegister({
          body: {
            otp: data.value?.join("")
          }
        }).then((res) => {
          if (res.status !== 'OTPWRONG') {
            setRefreshUserInfo(true)
          } else {
            setOtpType(data?.type);
            setOpenOtp(true);
          }
        })
          .catch(() => {
            setOtpType(data?.type);
            setOpenOtp(true);
          });
        break;
      case OtpType.MpsCancelVerify:
        MpsService.mpsVerifyCancel({
          body: {
            otp: data.value?.join("")
          }
        }).then((res) => {
          if (res.status !== 'OTPWRONG') {
            setRefreshUserInfo(true)
          } else {
            setOtpType(data?.type);
            setOpenOtp(true);
          }
        })
          .catch(() => {
            setOtpType(data?.type);
            setOpenOtp(true);
          });
        break;
      default:
        setOpenOtp(false);
        setOtpType(null);
        break
    }
  };

  const onSubmitPhoneNumber = (data: any) => {
    setOpenPhoneNumber(false)
    if (data?.value?.length) {
      setPhoneNumber(data?.value)
      AuthService.sendOtp({
        body: {
          phone: data?.value
        }
      })
        .then((res) => {
          if (res.status === 'OK') {
            setOtpType(OtpType.UserVerify);
            setOpenOtp(true);
          } else
            setOpenPhoneNumber(true)
        })
        .catch((err) => {
          setOpenPhoneNumber(true)
        })
    }
  }

  const handleCloseModalBase = () => {
    setIsModalRegisterSuccess(false)
  }

  const handleChargePlay = () => {
    if (isWebView()) {
      SupperApp.spGetChargeUrl().then((res) => {
        if (res.code == "200") {
          window.location.href = res.data;
        } else {
          setIsModalCharge(false)
          setIsModalEnoughMoney(true);
        }
      }).catch((err) => {
      });
    } else {
      MpsService.mpsCharge({
        body: {
          cate: 'BUY3'
        }
      })
        .then((res) => {
          if (res.status === 'OK') {
            setRefreshUserInfo(true)
            setIsModalCharge(false)
          } else {
            setIsModalCharge(false)
            setIsModalEnoughMoney(true);
          }
        })
        .catch()
    }

  }

  const onChangePlayTurn = () => {
    setIsModalShakeSuccess(false)
    setIsModalCharge(true)
  }

  const onMute = () => {
    setMuteAudioBg(!muteAudioBg)
  }

  return (
    <>
      <Head>
        <title>Treasure game</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main>
        <Box
          position={"relative"}
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            maxWidth: "480px",
            margin: "0 auto"
          }}
        >
          <img
            alt={"/images/background-home.jpg"}
            src={"/images/background-home.jpg"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              bottom: 0,
              maxWidth: "480px"
            }}
          />
          <img
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100vh",
              maxWidth: "480px",
              margin: "0 auto"
            }}
            src={"/images/background-footer.png"}
            alt={"/images/background-footer.png"}
          />
          {/* <img
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "50vh",
              maxWidth: "480px",
              margin: "0 auto"
            }}
            src={"/images/image-name.png"}
            alt={"/images/image-name.png"}
          /> */}
          <HomeHeader backSuperApp={backSuperApp} phoneNumber={userInfo?.phone || phoneNumber} totalStar={userInfo?.totalStar || 0} muteAudioBackground={onMute} />
          <HexTileLayout />
          <HomeFooter
            audioRef={audioRef}
            videoRef={videoRef}
            statusShake={statusShake}
            openChest={openChest}
            quantityTurn={userInfo?.totalPlay || 0}
            handleRegister={handleRegister}
            handleCancel={handleCancel}
            userInfo={userInfo}
            muteAudioBackground={muteAudioBg}
            isOnShake={isOnShake}
            setIsOnShake={setIsOnShake}
          />
        </Box>
        <ModalDefaultBase
          title={trans["Not Enough Money"]}
          description={trans["Top up to buy more"]}
          textConfirm={trans["Buy more"]}
          image={"noMoney"}
          open={isModalEnoughMoney}
        />
        <ModalDefaultBase
          title={trans["You have ran out of turn"]}
          description={
            trans["You can buy more turns."] + "\n" + trans["5 TURNS/100 FBU"]
          }
          textConfirm={trans["Buy more"]}
          image={"noChest"}
          open={isModalCharge}
          handleClose={() => {
            setIsModalCharge(false)
          }}
          handleConfirm={handleChargePlay}
        />
        <ModalDefaultBase
          title={trans["Register Successfully"]}
          description={trans["Play the game now!"]}
          textConfirm={trans["Play Now"]}
          open={isModalRegisterSuccess}
          handleClose={() => setIsModalRegisterSuccess(false)}
          handleConfirm={() => setIsModalRegisterSuccess(false)}
        />
        <ModalDefaultBase
          title={trans["Cancel Successful"]}
          textConfirm={trans["Confirm"]}
          open={isModalCancelSuccess}
          handleClose={() => setIsModalCancelSuccess(false)}
          handleConfirm={() => setIsModalCancelSuccess(false)}
        />
        <ModalOtp errorMessage={errorMessage} open={openOtp} type={otpType} phoneNumber={userInfo?.phone || phoneNumber} handleClose={onSubmitOtp} />
        <ModalPhoneNumber open={openPhoneNumber} handleClose={onSubmitPhoneNumber} />
        <ModalSuccess
          open={isModalShakeSuccess}
          onClickShakeMore={openChest}
          onClickReceive={() => {
            handleStatusShake("inProgress")
          }}
          image={
            dataSuccessShake?.image && <ImageBase src={dataSuccessShake?.image} width={100} height={100} />
          }
          title={dataSuccessShake?.title}
          description={dataSuccessShake?.description}
          isChargeTurn={isChargeTurn}
          onChagePlayTurn={onChangePlayTurn}
          handleClose={() => {
            setIsModalShakeSuccess(false)
            setStatusShake(TStatusShake.done)
          }}
        />
      </main>
    </>
  );
};

export default Home;
