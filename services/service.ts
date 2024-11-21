import { api } from "../constants";
import {
  IRequestConfig,
  IRequestOptions,
  axios,
  getConfigs,
} from "./serviceOptions";
export const basePath = "";

export class AuthService {
  /**
   * send_otp
   */
  static sendOtp(
    params: {
      /** requestBody */
      body?: AuthSendOtp;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.send_otp;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * verify_otp
   */
  static verifyOtp(
    params: {
      /** requestBody */
      body?: AuthVerifyOtp;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AuthVerifyOtpResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.verify_otp;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * verify_natcom
   */
  static verifyNatcom(
    params: {
      /** requestBody */
      body?: AuthVerifyNatcom;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AuthVerifyNatcomResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.verify_natcom;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }

  /**
   * logout
   */
  static logout(): Promise<AuthVerifyOtpResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.logout;

      const configs: IRequestConfig = getConfigs(
        "get",
        "application/json",
        url,
        {}
      );
      axios(configs, resolve, reject);
    });
  }

  /**
   * user info
   */
  static userInfo(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserInfoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.user_info;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class MpsService {
  /**
   * register
   */
  static mpsRegister(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.mps_register;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * mps_verify_register
   */
  static mpsVerifyRegister(
    params: {
      body: BaseRequestOtp;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.mps_verify_register;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * mps_cancel
   */
  static mpsCancel(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.mps_cancel;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * mps_verify_cancel
   */
  static mpsVerifyCancel(
    params: {
      body: BaseRequestOtp;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.mps_verify_cancel;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * mps_charge
   */
  static mpsCharge(
    params: {
      body: Charge;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.mps_charge;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class PlayService {
  /**
   * play_run
   */
  static playRun(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<PlayRunResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.play_run;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * play_history
   */
  static playHistory(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.play_history;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * play_share_plus
   */
  static playSharePlus(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.play_share_plus;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * play_get_all_gift
   */
  static playGetAllGift(
    params: {} = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.play_get_all_gift;

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class AdminService {
  /**
   * admin_increment_play
   */
  static incrementPlay(
    params: {
      phone: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.admin_increment_play;

      const configs: IRequestConfig = getConfigs(
        "get",
        "application/json",
        url,
        options
      );
      configs.params = {
        phone: params.phone,
      };

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * admin_get_otp
   */
  static getOtp(
    params: {
      phone: string;
    },
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + api.admin_get_otp;

      const configs: IRequestConfig = getConfigs(
        "get",
        "application/json",
        url,
        options
      );
      configs.params = {
        phone: params.phone,
      };

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export type BaseResponse = {
  status: string;
  message: string;
};
export type BaseRequestOtp = {
  otp: string;
};
export type AuthSendOtp = {
  phone: string;
};
export type AuthVerifyOtp = BaseRequestOtp & {
  phone: string;
};
export type AuthVerifyNatcom = BaseRequestOtp & {
  token: string;
};
export type AuthVerifyOtpResponse = {
  accessToken: string;
  tokenType: string;
};
export type AuthVerifyNatcomResponse = {
  accessToken: string;
  tokenType: string;
};
export type UserInfoResponse = {
  id: string;
  phone: string;
  addTime: string;
  totalPlay: number;
  totalStar: number;
  premium: boolean;
  isWin?: boolean;
};
export type PlayRunResponse = BaseResponse & {
  gift: any;
};
export type Charge = {
  cate: string;
};
