import Shake from 'shake.js';

export class ShakeDetectorService {
  private static shake: any; // Biến để lưu instance của Shake.js
  private static threshold: number = 15; // Ngưỡng lắc
  private static eventListener: () => void = () => {}; // Placeholder cho sự kiện shake

  // Gắn sự kiện khi lắc
  public static onShake(listener: () => void) {
    this.shake = new Shake({ threshold: this.threshold });
    this.shake.start();

    this.eventListener = listener;
    window.addEventListener("shake", this.eventListener);
  }

  // Xóa sự kiện shake
  public static removeShakeListener() {
    if (this.eventListener) {
      window.removeEventListener("shake", this.eventListener);
    }
  }

  // Yêu cầu quyền cảm biến chuyển động (chỉ dành cho iOS)
  public static async requestMotionPermission(): Promise<boolean> {
    try {
      const response = await (DeviceMotionEvent as any).requestPermission();
      alert("res: " + response);
      if (response === "granted") {
        localStorage.setItem("motionPermission", "granted");
        return true;
      } else {
        localStorage.setItem("motionPermission", "denied");
        alert("Permission denied. Motion detection will not work.");
        return false;
      }
    } catch (error) {
      alert("res: " + error);
      console.error("Error requesting motion permission:", error);
      return false;
    }
  }

  // Tự động kiểm tra quyền và khởi tạo
  public static async initialize() {
    const motionPermission = localStorage.getItem("motionPermission");
    const ios =
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as any).requestPermission === "function";

    if (motionPermission === "granted") {
    } else if (ios) {
      const userPrompt = confirm(
        "This app needs motion detection permission to work. Do you want to enable it?"
      );
      if (userPrompt) {
        await this.requestMotionPermission();
      }
    }
  }

  // Ngừng ShakeDetector
  public static stop() {
    if (this.shake) {
      this.shake.stop();
    }
    this.removeShakeListener();
  }
}
