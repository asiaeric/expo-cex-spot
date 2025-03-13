import i18next from "i18next";
import { ReactNode, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

import ConfirmPopup, { ConfirmPopupRefProps } from "@/components/ConfirmPopup";
import { BackButton } from "@/components/atoms";
import WSStatus from "@/components/atoms/WSStatus";
import LanguageSelection from "@/components/molecules/LanguageSelection";
import { SafeScreen } from "@/components/template";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";

const InfoWrapper = ({
  title,
  action,
  style,
}: {
  title: string;
  action: ReactNode | string;
  style?: ViewStyle | ViewStyle[];
}) => {
  const { gutters, fonts, layout } = useTheme();
  return (
    <View
      style={[layout.row, layout.justifyBetween, gutters.marginTop_24, style]}>
      <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>{title}</Text>
      {typeof action === "string" ? (
        <Text style={[fonts.size_14, fonts.gray800]}>{action}</Text>
      ) : (
        action
      )}
    </View>
  );
};

const SettingScreen = () => {
  const { t } = useTranslation("setting");
  const onChangeLanguage = useCallback((lang: "vn" | "en") => {
    void i18next.changeLanguage(lang);
  }, []);

  const { gutters, fonts, components, layout } = useTheme();
  const { user } = useStoreState((store) => store.userModel);
  const { logOut } = useStoreActions((store) => store.userModel);
  const confirmRef = useRef<ConfirmPopupRefProps>(null);

  const handleOnLogOut = useCallback(() => {
    confirmRef.current?.open(() => onConfirm());
  }, []);

  const onConfirm = useCallback(() => {
    logOut();
  }, []);

  return (
    <SafeScreen>
      <View style={gutters.marginHorizontal_16}>
        <BackButton />
        <Text
          style={[
            fonts.size_32,
            fonts.gray800,
            fonts.bold,
            gutters.marginTop_8,
          ]}>
          {t("settings")}
        </Text>
        <View style={components.divider} />
        <View>
          <Text style={[fonts.gray400, fonts.bold, fonts.size_16]}>
            {t("connection")}
          </Text>
          <InfoWrapper title={t("wsStatus")} action={<WSStatus />} />
        </View>
        <View style={components.divider} />
        <View>
          <Text style={[fonts.gray400, fonts.bold, fonts.size_16]}>
            {t("language")}
          </Text>
          <InfoWrapper title={t("language")} action={<LanguageSelection />} />
        </View>
        <View style={components.divider} />
        <View>
          <Text style={[fonts.gray400, fonts.bold, fonts.size_16]}>
            {t("account")}
          </Text>
          <InfoWrapper title={t("firstName")} action={user?.firstName} />
          <InfoWrapper title={t("lastName")} action={user?.lastName} />
          <InfoWrapper title={t("email")} action={user?.email} />
          <TouchableOpacity onPress={handleOnLogOut}>
            <Text
              style={[
                fonts.red500,
                fonts.bold,
                fonts.size_16,
                layout.selfRight,
                gutters.marginTop_32,
              ]}>
              {t("logOut")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmPopup ref={confirmRef} title={t("confirmLogout")} />
    </SafeScreen>
  );
};

export default SettingScreen;
