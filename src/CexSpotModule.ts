import { NativeModule, requireNativeModule } from 'expo';

import { CexSpotModuleEvents } from './CexSpot.types';

declare class CexSpotModule extends NativeModule<CexSpotModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CexSpotModule>('CexSpot');
