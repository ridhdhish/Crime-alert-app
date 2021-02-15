import { Accelerometer } from "expo-sensors";
//this is shake sensitivity - lowering this will give high sensitivity and increasing this will give lower sensitivity
const THRESHOLD = 500;
export class ShakeEventExpo {
  static addListener(handler) {
    let last_x, last_y, last_z;
    let lastUpdate = 0;
    Accelerometer.addListener((accelerometerData) => {
      let { x, y, z } = accelerometerData;
      let currTime = Date.now();
      if (currTime - lastUpdate > 100) {
        let diffTime = currTime - lastUpdate;
        lastUpdate = currTime;
        let speed =
          (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
        if (speed > THRESHOLD) {
          handler();
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners();
  }
}
