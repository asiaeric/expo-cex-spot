import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Row from "./Row";

import CustomBottomSheet, {
  BottomSheetRefProps,
} from "@/components/atoms/CustomBottomSheet";
import { storage } from "@/stores";
import { useTheme } from "@/theme";
import i18next, { languageNames, languageResources } from "@/translations";
import { wait } from "@/utils/StringHelper";

interface ItemProps {
  item: string;
}

interface AggregationSelectionType {
  customStyle?: ViewStyle | ViewStyle[];
}

function LanguageSelection({ customStyle }: AggregationSelectionType) {
  const { layout, gutters, fonts, components, colors } = useTheme();
  const bsRef = useRef<BottomSheetRefProps>(null);
  const { t } = useTranslation(["common"]);

  const languages = Object.keys(languageResources);

  const onChangeLanguage = useCallback((lang: "vn" | "en") => {
    void i18next.changeLanguage(lang);
  }, []);

  const onChangeLanguagePress = useCallback((language: "en" | "vn") => {
    storage.set("language", language);
    onChangeLanguage(language);
  }, []);

  const renderItem = useCallback((data: ItemProps) => {
    const { item } = data;
    return (
      <Row
        isSelected={item === i18next.language}
        item={item}
        onPress={async () => {
          bsRef.current?.close();
          await wait(1);
          onChangeLanguagePress(item as "en" | "vn");
        }}
      />
    );
  }, []);

  return (
    <View style={[customStyle]}>
      <TouchableOpacity
        style={[layout.row, layout.itemsCenter]}
        onPress={() => {
          bsRef.current?.open();
        }}>
        <Text style={[fonts.gray200]}>{languageNames[i18next.language]}</Text>
        {/* <Image
          source={DownImage}
          style={[
            components.image12,
            { tintColor: colors.gray200 },
            gutters.marginLeft_4,
          ]}
        /> */}
      </TouchableOpacity>
      <CustomBottomSheet ref={bsRef}>
        <View style={[layout.itemsCenter]}>
          <Text style={[fonts.size_16, fonts.gray50]}>
            {t("common:selectLanguage")}
          </Text>
          <View style={[components.separator, gutters.marginVertical_16]} />
          <FlatList
            data={languages}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, idx) => `${idx}`}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
}

export default LanguageSelection;
