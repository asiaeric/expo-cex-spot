import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useTheme } from "../../../theme";
import CustomButton from "../../AppButton";

type Props = {
  title?: string;
  onPress: () => void;
};

function SuccessPopup({ title, onPress }: Props) {
  const { components, fonts, layout, gutters, backgrounds } = useTheme();
  const { t } = useTranslation(["common"]);

  return (
    <View style={[layout.itemsCenter, gutters.marginHorizontal_24]}>
      {/* <LottieView
        autoPlay
        loop={false}
        source={require("@/theme/assets/images/success.json")}
        style={components.lottieIcon}
      /> */}
      <Text
        style={[
          fonts.size_16,
          fonts.purple500,
          fonts.bold,
          fonts.alignCenter,
          gutters.marginBottom_40,
        ]}>
        {title}
      </Text>
      <CustomButton
        type="regular"
        onPress={onPress}
        text={t("common:gotIt")}
        textStyle={fonts.gray50}
        customStyle={backgrounds.green}
      />
    </View>
  );
}

export default SuccessPopup;
