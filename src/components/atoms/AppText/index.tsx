/* eslint-disable no-nested-ternary */
import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

import { useTheme } from "@/theme";

type TextVariant =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "H6"
  | "Title"
  | "SubTitle"
  | "Caption"
  | "SubCaption";

interface AppTextProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: TextVariant;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const getDefaultStyle = (variant: TextVariant): TextStyle => {
  switch (variant) {
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
      return { fontWeight: "500" };
    default:
      return { fontWeight: "400" };
  }
};

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  ellipsizeMode,
  variant = "Title",
}) => {
  const { fonts } = useTheme();

  const defaultStyle = getDefaultStyle(variant);

  const fontSize =
    variant === "H1"
      ? fonts.size_40
      : variant === "H2"
        ? fonts.size_32
        : variant === "H3"
          ? fonts.size_28
          : variant === "H4"
            ? fonts.size_20
            : variant === "H5"
              ? fonts.size_16
              : variant === "Title"
                ? fonts.size_14
                : variant === "SubTitle"
                  ? fonts.size_12
                  : variant === "Caption"
                    ? fonts.size_10
                    : variant === "SubCaption"
                      ? fonts.size_8
                      : fonts.size_14;

  return (
    <Text
      style={[
        fontSize,
        fonts.text,
        fonts.lineHeight18,
        defaultStyle,
        fontSize,
        style,
      ]}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </Text>
  );
};

const createStyledTextComponent = (variant: TextVariant) => {
  return (props: AppTextProps) => <AppText {...props} variant={variant} />;
};

interface AppTextWithVariantProps extends React.FC<AppTextProps> {
  H1: React.FC<AppTextProps>;
  H2: React.FC<AppTextProps>;
  H3: React.FC<AppTextProps>;
  H4: React.FC<AppTextProps>;
  H5: React.FC<AppTextProps>;
  Title: React.FC<AppTextProps>;
  SubTitle: React.FC<AppTextProps>;
  Caption: React.FC<AppTextProps>;
  SubCaption: React.FC<AppTextProps>;
}

const StyledTextComponent = AppText as AppTextWithVariantProps;

StyledTextComponent.H1 = createStyledTextComponent("H1");
StyledTextComponent.H2 = createStyledTextComponent("H2");
StyledTextComponent.H3 = createStyledTextComponent("H3");
StyledTextComponent.H4 = createStyledTextComponent("H4");
StyledTextComponent.H5 = createStyledTextComponent("H5");
StyledTextComponent.Title = createStyledTextComponent("Title");
StyledTextComponent.SubTitle = createStyledTextComponent("SubTitle");
StyledTextComponent.Caption = createStyledTextComponent("Caption");
StyledTextComponent.SubCaption = createStyledTextComponent("SubCaption");

export default StyledTextComponent;
