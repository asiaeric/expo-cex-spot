import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView, Text, View } from "react-native";
import {
  AndroidSoftInputModes,
  KeyboardAwareScrollView,
  KeyboardController,
  useKeyboardController,
} from "react-native-keyboard-controller";

import AppSafeArea from "@/components/AppSafeArea";
import { BackButton, CustomButton, CustomTextInput } from "@/components/atoms";
import PasswordRequirements from "@/components/atoms/PasswordStrengthIndicator";
import { SignUpSchema } from "@/schemas";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { validateField } from "@/utils/StringHelper";

function SignUpScreen() {
  const { t } = useTranslation(["common", "signup"]);
  const { isSigning, signUpError } = useStoreState((store) => store.userModel);
  const { signUp, resetError } = useStoreActions((store) => store.userModel);
  const { setEnabled } = useKeyboardController();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { gutters, fonts, backgrounds } = useTheme();

  useEffect(() => {
    KeyboardController.setInputMode(
      AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
    );
    return () => {
      KeyboardController.setDefaultMode();
    };
  }, []);

  const onBlurName = () => {
    resetError();
    const errorMessage = validateField(SignUpSchema, "name", name);
    setNameError(errorMessage);
    reActiveAnimate();
  };

  const onBlurEmail = () => {
    resetError();
    const errorMessage = validateField(SignUpSchema, "email", email.trim());
    setEmailError(errorMessage);
    reActiveAnimate();
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
    if (confirmPassword) {
      const errorMessage =
        text !== confirmPassword ? t("signup:passwordNotMatch") : "";
      setConfirmPasswordError(errorMessage);
    }
  };

  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    const errorMessage =
      text.length > 0 && text !== password ? t("signup:passwordNotMatch") : "";
    setConfirmPasswordError(errorMessage);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const reActiveAnimate = () => {
    if (Platform.OS === "android") setEnabled(true);
  };
  const onFocusNoNeedAnimate = () => {
    if (Platform.OS === "android") setEnabled(false);
  };

  const handleSubmit = () => {
    const signUpRequest = SignUpSchema.safeParse({
      firstName: name,
      lastName: "CEX",
      email: email.trim(),
      password,
    });
    if (signUpRequest.success) {
      signUp(signUpRequest.data);
    }
  };

  const isDisable = useMemo(() => {
    if (
      !email ||
      !name ||
      !password ||
      !confirmPassword ||
      !!emailError ||
      !!nameError ||
      !!confirmPasswordError
    ) {
      return true;
    }
    return false;
  }, [
    email,
    name,
    password,
    confirmPassword,
    emailError,
    confirmPasswordError,
    emailError,
  ]);

  const errorDisplay: Record<string, string> = {
    EMAIL_EXISTS: t("signup:emailExist"),
  };

  return (
    <AppSafeArea>
      <BackButton isAbsolute />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={[gutters.paddingHorizontal_32]}
        bottomOffset={200}>
        <View style={[gutters.marginTop_80]}>
          <Text
            style={[
              fonts.size_32,
              fonts.gray800,
              fonts.bold,
              fonts.alignCenter,
            ]}>
            {t("signup:title")}
          </Text>
        </View>
        <View>
          <CustomTextInput
            title={t("signup:name")}
            onChangeText={(text: string) => {
              setNameError("");
              setName(text);
            }}
            value={name}
            onBlur={onBlurName}
            onFocus={onFocusNoNeedAnimate}
            placeholder={t("signup:inputName")}
            centerText
          />
          {nameError && (
            <Text style={[fonts.red500, gutters.marginTop_10, fonts.size_10]}>
              {nameError}
            </Text>
          )}
        </View>
        <View>
          <CustomTextInput
            title={t("signup:email")}
            onChangeText={(text: string) => {
              setEmailError("");
              setEmail(text);
            }}
            value={email}
            onFocus={onFocusNoNeedAnimate}
            onBlur={onBlurEmail}
            placeholder={t("signup:inputEmail")}
            centerText
          />
          {emailError && (
            <Text style={[fonts.red500, gutters.marginTop_10, fonts.size_10]}>
              {emailError}
            </Text>
          )}
        </View>
        <View>
          <CustomTextInput
            title={t("signup:password")}
            onChangeText={onChangePassword}
            secureTextEntry
            textContentType="oneTimeCode"
            value={password}
            placeholder={t("signup:inputPassword")}
            centerText
          />
          <PasswordRequirements password={password} />
        </View>
        <View>
          <CustomTextInput
            title={t("signup:confirmPassword")}
            onChangeText={onChangeConfirmPassword}
            secureTextEntry
            textContentType="oneTimeCode"
            placeholder={t("signup:inputConfirmPassword")}
            value={confirmPassword}
            centerText
          />
          {confirmPasswordError && (
            <Text style={[fonts.red500, gutters.marginTop_10, fonts.size_10]}>
              {confirmPasswordError}
            </Text>
          )}
          <View style={[gutters.paddingVertical_16]}>
            {signUpError && (
              <Text
                style={[
                  fonts.red500,
                  gutters.marginBottom_10,
                  fonts.size_14,
                  fonts.alignCenter,
                  fonts.bold,
                  fonts.capitalize,
                ]}>
                {errorDisplay[signUpError]}
              </Text>
            )}
            <CustomButton
              type="regular"
              customStyle={[backgrounds.green]}
              textStyle={fonts.gray50}
              onPress={handleSubmit}
              loading={isSigning}
              text={t("signup:signUp")}
              isDisabled={isDisable}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* <BackButton /> */}
    </AppSafeArea>
  );
}

export default SignUpScreen;
