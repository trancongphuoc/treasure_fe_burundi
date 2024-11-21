export const getImageSuccessModal = (type: string): string => {
  if (type?.includes("STARS")) {
    return "/images/coin.svg";
  } else if (type?.includes("MONEY") || type?.includes("FBU")) {
    return "/images/money-default.svg";
  } else
    switch (type) {
      case "M":
        return "/images/letter_square/image-text-m.png";
      case "Y":
        return "/images/letter_square/image-text-y.png";
      case "L":
        return "/images/letter_square/image-text-l.png";
      case "U":
        return "/images/letter_square/image-text-u.png";
      case "M2":
        return "/images/letter_square/image-text-m2.png";
      case "I":
        return "/images/letter_square/image-text-i.png";
      case "T":
        return "/images/letter_square/image-text-t.png";
      case "E":
        return "/images/letter_square/image-text-e.png";
      case "L2":
        return "/images/letter_square/image-text-l2.png";
      case "SAMSUNG1":
        return "/images/phone/image-puzzle-1.svg";
      case "SAMSUNG2":
        return "/images/phone/image-puzzle-2.svg";
      case "SAMSUNG3":
        return "/images/phone/image-puzzle-3.svg";
      case "SAMSUNG4":
        return "/images/phone/image-puzzle-4.svg";
      case "SAMSUNG":
        return "/images/phone/image-puzzle-win.svg";
      case "TWENTY_SMS":
        return "/images/image-sms.png";
      case "TWENTY_MB":
        return "/images/image-mb.png";
      default:
        return "/images/unlucky.svg";;
    }
};
