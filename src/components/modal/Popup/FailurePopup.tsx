import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useTheme } from "../../../theme";
import CustomButton from "../../AppButton";

type Props = {
  onPress: () => void;
  title?: string;
};

function FailurePopup({ onPress, title }: Props) {
  const { components, fonts, layout, gutters, backgrounds } = useTheme();
  const { t } = useTranslation(["common"]);

  return (
    <View style={[layout.itemsCenter, gutters.marginHorizontal_24]}>
      <Text
        style={[
          fonts.size_16,
          fonts.gray800,
          fonts.bold,
          fonts.alignCenter,
          gutters.marginBottom_40,
        ]}>
        {title || t("common:failure")}
      </Text>
      <CustomButton
        text={t("common:gotIt")}
        type="regular"
        onPress={onPress}
        textStyle={fonts.gray50}
        customStyle={backgrounds.red500}
      />
    </View>
  );
}

export default FailurePopup;
