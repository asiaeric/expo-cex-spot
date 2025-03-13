/* eslint-disable no-underscore-dangle */

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/AppButton";
import AppSafeArea from "@/components/AppSafeArea";
import CustomTextInput from "@/components/AppTextInput";
import usePreventBackNavigation from "@/hooks/usePreventBackHandler";
import { useAppNavigation } from "@/navigators/Application";
import { SignInSchema } from "@/schemas";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { RouteName } from "@/types/navigation";

function SignInScreen() {
  const navigation = useAppNavigation();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });
  usePreventBackNavigation();

  const { t } = useTranslation(["common", "login"]);
  const { isSigning = true, loginError } = useStoreState(
    (store) => store.userModel,
  );
  const { signIn, resetError } = useStoreActions((store) => store.userModel);

  const { layout, gutters, fonts, backgrounds } = useTheme();

  const onSubmit = (data: FieldValues) => {
    console.log("data", data);
    signIn(data as { email: string; password: string });
  };

  return (
    <AppSafeArea>
      <ScrollView style={layout.flex_1}>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_40,
          ]}
        />

        <View style={[gutters.paddingHorizontal_32]}>
          <View style={[gutters.marginTop_40]}>
            <Text
              style={[
                fonts.size_40,
                fonts.gray800,
                fonts.bold,
                fonts.alignCenter,
              ]}>
              {t("login:title")}
            </Text>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_32,
                fonts.alignCenter,
              ]}>
              {t("login:subtitle")}
            </Text>
          </View>
          <View>
            <CustomTextInput
              value={control._defaultValues.email}
              title={t("login:email")}
              onChangeText={(text) => {
                setValue("email", text);
              }}
              placeholder={t("login:inputEmail")}
              centerText
              {...register("email")}
            />
            {errors.email && (
              <Text style={[fonts.red500, gutters.marginTop_10, fonts.size_10]}>
                {errors.email.message?.toString()}
              </Text>
            )}
          </View>
          <View>
            <CustomTextInput
              value={control._defaultValues.password}
              title={t("login:password")}
              secureTextEntry
              placeholder={t("login:inputPassword")}
              centerText
              {...register("password")}
              onChangeText={(text) => {
                setValue("password", text);
              }}
            />
            {errors.password && (
              <Text style={[fonts.red500, gutters.marginTop_10, fonts.size_10]}>
                {errors.password.message?.toString()}
              </Text>
            )}
          </View>
          <CustomButton
            type="regular"
            customStyle={[backgrounds.gray800, gutters.marginTop_80]}
            textStyle={fonts.gray100}
            onPress={handleSubmit(onSubmit)}
            loading={isSigning}
            text={t("login:login")}
          />
          {loginError && (
            <Text
              style={[
                fonts.red500,
                gutters.marginTop_10,
                fonts.size_14,
                fonts.alignCenter,
                fonts.bold,
              ]}>
              {loginError}
            </Text>
          )}
          <Text
            style={[
              gutters.marginVertical_32,
              fonts.alignCenter,
              fonts.gray200,
            ]}>
            {t("login:orIfDontHaveAccount")}
          </Text>
          <CustomButton
            type="regular"
            customStyle={[backgrounds.green]}
            textStyle={fonts.gray50}
            onPress={() => {
              navigation.navigate(RouteName.SignUp);
            }}
            loading={isSigning}
            text={t("login:createNewVICAccount")}
          />
        </View>
      </ScrollView>
    </AppSafeArea>
  );
}

export default SignInScreen;
