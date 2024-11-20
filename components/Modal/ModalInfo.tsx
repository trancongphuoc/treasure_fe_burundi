import ModalBase from "./components/ModalBase";
import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { DialogContent, Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import useTrans from "../../lang/useTrans"
interface IModalInfoProps extends DialogProps {
  handleClose?: () => void;
}
const ModalInfo: React.FC<IModalInfoProps> = (props) => {
  const { handleClose, ...dialogProps } = props;
  const trans = useTrans();

  return (
    <ModalBase {...dialogProps} direction={"left"} handleClose={handleClose}>
      <DialogTitle sx={{ padding: "32px 24px 16px" }}>
        <Typography
          fontSize={"18px"}
          fontWeight={700}
          lineHeight={"22px"}
          color={"#502A00"}
        >
          {trans.Guide}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          height: 500,
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start', overflow: 'auto', gap: 25 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start', gap: 5 }}>
            {/* <Typography sx={{ fontWeight: 600 }}>Kisa vire ILUCKY PREMIUM nan ye?</Typography> */}
            <Typography sx={{ fontWeight: 400, textAlign: 'left' }}>
            TREASURE (Shake The Fortune Chest) ni uburyo bwo gukina udukino dutoduto, abakinyi bakaronka amahirwe yo gutsindira ubushimwe butandukanye.  Ushobora kuronka: Samsung Galaxy S24, 1.000.000F, 500.000F muri Lumicash yawe.
            </Typography>
          </div>
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start', gap: 5 }}>
            <Typography sx={{ fontWeight: 600 }}>Koman pouw jwenn chans pou vire?</Typography>
            <Typography className="font-normal text-justify">
              Chak jou: Wap resevwa 5 fwa gratis pou vire avek Ilucky
            </Typography>
            <Typography className="font-normal text-justify">
              Yon vire gratis pa jou a 8PM avek sub
            </Typography>
            <Typography className="font-normal text-justify">
              Achte plis vire pouw ka gen chans gen gwo prim nan Ilucky Premium: atrave chen (SMS,USSD,Ilucky nan NatcomID), kliyan ap gen 3 fwa poul vire, pri 3HTG/jou.
            </Typography>
            <Typography className="font-normal text-justify">
              Pou anile, voye OFF1 nan 5500. Bon chans!
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start', gap: 5 }}>
            <Typography sx={{ fontWeight: 600 }}>Evalyasyon sta chak jou</Typography>
            <Typography className="font-normal text-justify">
              Chak jou, nap seleksyone 2 gayan jou a nan moun ki an tet yo poun bayo pri ki evalye a 20HTG
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start', gap: 5 }}>
            <Typography sx={{ fontWeight: 600 }}>E sim genyen?</Typography>
            <Typography className="font-normal text-justify">
              Wap genyen anpil prim lew jwe Ilucky Premium. Men ki pwosesis pouw genyen:
            </Typography>
            <Typography className="font-normal text-justify">
              Pou Iphone 14 oubyen lo: Call Center ap relew pou konfime prim nan. Prim aktyel la ap depann de sitiyasyon aktyel la.
            </Typography>
            <Typography className="font-normal text-justify">
              Pou prim HTG: nap ajoute prim nan nan kont de baz ou.
            </Typography>
            <Typography className="font-normal text-justify">
              Ou kapab verifye prim nan sou ekranw.
            </Typography>
          </div> */}
        </div>
        {/* <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"17px"}
          color={"#502A00"}
          sx={{
            wordBreak: "break-word",
            whiteSpace: "pre-line",
          }}
        >
          {"What is Ilucky Premium Spin?" +
            "Building on the ILucky platform - Natcom's promotion to all of Natcom beloved customers, Ilucky premium brings more valuable prizes. Helping customers have entertaining minutes and interesting experiences through game." +
            "Kisa vire ILUCKY PREMIUM nan ye?" +
            "Konstwi nan platform ILucky-Pwomosyon natcom pou tout kliyan fidel li yo,premium Ilucky a pote plis prim valab. Ede kliyan yo jwenn plis minit ak eksperyans ki enteresan nan jwet la." +
            "How to earn spin turn?" +
            "Daily: You will receive 5 free spin turns with Ilucky" +
            "Free 1 spin per day at 8PM with sub" +
            "Buy more turns for big prizes from Ilucky Premium: via any channels (SMS, USSD, via Ilucky on NatcomID), customer will receive 5 turns, fee 3HTG/day." +
            "Koman pouw jwenn chans pou vire?" +
            "Chak jou: Wap resevwa 5 fwa gratis pou vire avek Ilucky" +
            "Yon vire gratis pa jou a 8PM avek sub" +
            "Achte plis vire pouw ka gen chans gen gwo prim nan Ilucky Premium: atrave chen (SMS,USSD,Ilucky nan NatcomID), kliyan ap gen 3 fwa poul vire, pri 3HTG/jou." +
            "Daily star leaderboard" +
            "Every day, we will select top 2 stars winner of the day on Leaderboard to give the prizes of 20HTG" +
            "Evalyasyon sta chak jou" +
            "Chak jou, nap seleksyone 2 gayan jou a nan moun ki an tet yo poun bayo pri ki evalye a 20HTG" +
            "What if I win?" +
            "You will win a lot of prizes while playing Ilucky Premium. The process to handle prizes are as follows:" +
            "For IPhone 14 or gold: call center will contact you to confirm the prize. The actual prize handover process will depend on actual situation" +
            "For HTG prize: we will add the prize to your basic balance" +
            "You can check this prizes from history screen." +
            "E sim genyen?"}
        </Typography> */}
      </DialogContent>
    </ModalBase>
  );
};
export default ModalInfo;
