export const SITE_NAME = "MiniGame";
export const SITE_SLOGAN = "Site slogan...................";
export const api = {
  send_otp: "api/auth/send_otp",
  verify_otp: "api/auth/verify_otp",
  verify_natcom: "api/auth/verify_natcom",
  logout: "api/logout",
  user_info: "api/user/info",
  admin_increment_play: "api/admin/increment_play",
  admin_get_otp: "api/admin/get_otp",
  mps_register: "api/mps/register",
  mps_verify_register: "api/mps/verify_register",
  mps_cancel: "api/mps/cancel",
  mps_verify_cancel: "api/mps/verify_cancel",
  mps_charge: "api/mps/charge",
  play_run: "api/lucky/play",
  play_history: "api/lucky/history",
  play_share_plus: "api/lucky/share_plus",
  play_get_all_gift: "api/lucky/get_all_gift"
};
export const OtpType = {
  UserVerify: "user_verify",
  MpsRegisterVerify: "register_verify",
  MpsCancelVerify: "cancel_verify"
};
export const StorageKey = {
  accessToken: "accessToken",
  userInfo: "userInfo",
  motionPermission: "motionPermission"
};
export const TStatusShake = {
  inProgress: "inProgress",
  result: "result",
  done: "done"
};