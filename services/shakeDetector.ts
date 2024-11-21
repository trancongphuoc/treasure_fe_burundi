import Shake from 'shake.js';

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
      this.shake = new Shake({ threshold: this.threshold });
      this.shake.start();
    }
  
    // Gắn sự kiện khi lắc
    public onShake(listener: () => void) {
      this.initializeShake();
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
      try {
        const response = await (DeviceMotionEvent as any).requestPermission();
          alert("res: "  + response)
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
        alert("res: "  + error)
        console.error("Error requesting motion permission:", error);
        return false;
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
        const userPrompt = confirm(
          "This app needs motion detection permission to work. Do you want to enable it?"
        );
        if (userPrompt) {
          await this.requestMotionPermission();
        }
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
  