import { View, DimensionValue } from "react-native";

import VIC from "./VIC";

import { moderateScale } from "@/types/theme/responsive";

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
};

function Brand({ height, width }: Props) {
  const brandHeight: number = moderateScale(height as number);
  const brandWidth: number = moderateScale(width as number);

  return (
    <View style={{ height: brandHeight, width: brandWidth }}>
      <VIC />
    </View>
  );
}

Brand.defaultProps = {
  height: 120,
  width: 240,
};

export default Brand;
