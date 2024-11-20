import Image from "next/image";
import React from "react";
// import Money from "../../public/images/image-money.png";
// import NoMoney from "../../public/images/image-no-money.png";
// import Puzzle1 from "../../public/images/image-puzzle-1.png";
// import Puzzle2 from "../../public/images/image-puzzle-2.png";
// import Puzzle3 from "../../public/images/image-puzzle-3.png";
// import Puzzle4 from "../../public/images/image-puzzle-4.png";
// import Star from "../../public/images/image-star.png";
// import TextA from "../../public/images/image-text-a.png";
// import TextC from "../../public/images/image-text-c.png";
// import TextD from "../../public/images/image-text-d.png";
// import TextI from "../../public/images/image-text-i.png";
// import TextM from "../../public/images/image-text-m.png";
// import TextN from "../../public/images/image-text-n.png";
// import TextO from "../../public/images/image-text-o.png";
// import TextT from "../../public/images/image-text-t.png";
// import Chest from "../../public/images/chest.png";
// import NoChest from "../../public/images/no-chest.png";
// import ChestOpen from "../../public/images/chest-open.png";

interface IImages {
  width?: number;
  height?: number;
  src: string;
}
const ImageBase: React.FC<IImages> = ({ src, width = 100, height = 100 }) => {
  return <Image src={src} alt={src} width={width} height={height} />;
};
// const ImageMoney: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return (
//     <Image
//       src={"/images/image-money.png"}
//       alt={"image-money"}
//       width={width}
//       height={height}
//     />
//   );
// };
// const ImageNoMoney: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return (
//     <Image src={NoMoney} alt={"image-no-money"} width={width} height={height} />
//   );
// };
// const ImagePuzzle1: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Puzzle1} alt={"puzzle-1"} width={width} height={height} />;
// };
// const ImagePuzzle2: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Puzzle2} alt={"puzzle-2"} width={width} height={height} />;
// };
// const ImagePuzzle3: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Puzzle3} alt={"puzzle-3"} width={width} height={height} />;
// };
// const ImagePuzzle4: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Puzzle4} alt={"puzzle-4"} width={width} height={height} />;
// };
// const ImageStar: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Star} alt={"star"} width={width} height={height} />;
// };
// const ImageTextA: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextA} alt={"text-a"} width={width} height={height} />;
// };
//
// const ImageTextC: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextC} alt={"text-c"} width={width} height={height} />;
// };
// const ImageTextD: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextD} alt={"text-d"} width={width} height={height} />;
// };
// const ImageTextI: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextI} alt={"text-i"} width={width} height={height} />;
// };
// const ImageTextM: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextM} alt={"text-m"} width={width} height={height} />;
// };
// const ImageTextN: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextN} alt={"text-n"} width={width} height={height} />;
// };
// const ImageTextO: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextO} alt={"text-o"} width={width} height={height} />;
// };
//
// const ImageTextT: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={TextT} alt={"text-t"} width={width} height={height} />;
// };

// const ImageChest: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={Chest} alt={"chest"} width={width} height={height} />;
// };
// const ImageNoChest: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return <Image src={NoChest} alt={"no-chest"} width={width} height={height} />;
// };
// const ImageChestOpen: React.FC<IImages> = ({ width = 100, height = 100 }) => {
//   return (
//     <Image src={ChestOpen} alt={"chest-open"} width={width} height={height} />
//   );
// };

export {
  ImageBase,
  // ImageMoney,
  // ImageNoMoney,
  // ImagePuzzle1,
  // ImagePuzzle2,
  // ImagePuzzle3,
  // ImagePuzzle4,
  // ImageStar,
  // ImageTextA,
  // ImageTextC,
  // ImageTextD,
  // ImageTextI,
  // ImageTextM,
  // ImageTextN,
  // ImageTextO,
  // ImageTextT,
  // ImageChest,
  // ImageNoChest,
  // ImageChestOpen,
};
