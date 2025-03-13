import { registerWebModule, NativeModule } from "expo";

import { CexSpotModuleEvents } from "./CexSpot.types";

class CexSpotModule extends NativeModule<CexSpotModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit("onChange", { value });
  }
  hello() {
    return "Hello world! 👋";
  }
}

export default registerWebModule(CexSpotModule);
