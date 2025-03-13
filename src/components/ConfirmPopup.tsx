import LottieView from "lottie-react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { CustomButton, PopupModal } from "@/components/atoms";
import { useTheme } from "@/theme";

type Props = {
  title?: string;
};

export type ConfirmPopupRefProps = {
  open: (onConfirm: () => void) => void;
};

const ConfirmPopup = forwardRef<ConfirmPopupRefProps, Props>(
  ({ title }, ref) => {
    const { components, fonts, layout, gutters, backgrounds, borders } =
      useTheme();
    const { t } = useTranslation(["common"]);
    const [modalVisible, setModalVisible] = useState(false);

    const triggerConfirm = useRef<() => void>();

    useImperativeHandle(ref, () => ({
      open: (onConfirm: () => void) => {
        setModalVisible(true);
        triggerConfirm.current = onConfirm;
      },
    }));

    return (
      <PopupModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}>
        <View
          style={[
            layout.itemsCenter,
            gutters.marginHorizontal_24,
            backgrounds.modal,
            borders.rounded_16,
            gutters.padding_24,
          ]}>
          <LottieView
            autoPlay
            loop={false}
            duration={1000}
            source={require("@/theme/assets/images/question.json")}
            style={components.lottieIcon}
          />
          <Text
            style={[
              fonts.size_16,
              fonts.gray800,
              fonts.bold,
              fonts.alignCenter,
              gutters.marginTop_24,
              gutters.marginBottom_40,
            ]}>
            {title || t("common:confirmation")}
          </Text>
          <View style={[layout.row]}>
            <CustomButton
              text={t("common:no")}
              type="regular"
              onPress={() => {
                setModalVisible(false);
              }}
              textStyle={fonts.gray50}
              customStyle={[layout.flex_1, backgrounds.gray100]}
            />
            <CustomButton
              text={t("common:yes")}
              type="regular"
              onPress={() => {
                setModalVisible(false);
                if (triggerConfirm.current) triggerConfirm.current();
              }}
              textStyle={fonts.gray50}
              customStyle={[
                backgrounds.red500,
                layout.flex_1,
                gutters.marginLeft_16,
              ]}
            />
          </View>
        </View>
      </PopupModal>
    );
  },
);

export default ConfirmPopup;
