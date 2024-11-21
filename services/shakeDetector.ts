export class ShakeDetectorService {
    private shake: any; // Biến để lưu instance của Shake.js
    private threshold: number;
    private eventListener: () => void;
  
    constructor(threshold = 15) {
      this.threshold = threshold; // Ngưỡng lắc
      this.eventListener = () => {}; // Placeholder cho sự kiện shake
    }
  
    // Khởi tạo Shake.js
    private initializeShake() {
      const Shake = require("shake.js");
      this.shake = new Shake({ threshold: this.threshold });
      this.shake.start();
    }
  
    // Gắn sự kiện khi lắc
    public onShake(listener: () => void) {
      this.eventListener = listener;
      window.addEventListener("shake", this.eventListener);
    }
  
    // Xóa sự kiện shake
    public removeShakeListener() {
      if (this.eventListener) {
        window.removeEventListener("shake", this.eventListener);
      }
    }
  
    // Yêu cầu quyền cảm biến chuyển động (chỉ dành cho iOS)
    public async requestMotionPermission(): Promise<boolean> {
      const ios =
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function";
  
      if (ios) {
        try {
          const response = await (DeviceMotionEvent as any).requestPermission();
          if (response === "granted") {
            localStorage.setItem("motionPermission", "granted");
            this.initializeShake();
            return true;
          } else {
            localStorage.setItem("motionPermission", "denied");
            alert("Permission denied. Motion detection will not work.");
            return false;
          }
        } catch (error) {
          console.error("Error requesting motion permission:", error);
          return false;
        }
      } else {
        // Android hoặc không cần xin quyền
        this.initializeShake();
        return true;
      }
    }
  
    // Tự động kiểm tra quyền và khởi tạo
    public async initialize() {
      const motionPermission = localStorage.getItem("motionPermission");
      const ios =
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function";
  
      if (motionPermission === "granted") {
        this.initializeShake();
      } else if (ios) {
        await this.requestMotionPermission();
      } else {
        this.initializeShake();
      }
    }
  
    // Ngừng ShakeDetector
    public stop() {
      if (this.shake) {
        this.shake.stop();
      }
      this.removeShakeListener();
    }
  }
  