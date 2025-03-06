import * as React from 'react';

import { CexSpotViewProps } from './CexSpot.types';

export default function CexSpotView(props: CexSpotViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
