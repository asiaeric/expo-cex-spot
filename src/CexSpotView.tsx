import { requireNativeView } from 'expo';
import * as React from 'react';

import { CexSpotViewProps } from './CexSpot.types';

const NativeView: React.ComponentType<CexSpotViewProps> =
  requireNativeView('CexSpot');

export default function CexSpotView(props: CexSpotViewProps) {
  return <NativeView {...props} />;
}
