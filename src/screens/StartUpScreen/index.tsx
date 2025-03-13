import { useEffect } from "react";
import { View } from "react-native";

import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useAppNavigation } from "@/navigators/Application";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { getCredentials } from "@/stores/secureMMKVStorage";
import { useTheme } from "@/theme";
import { RouteName } from "@/types/navigation";

function StartUpScreen() {
  const { layout } = useTheme();
  const navigation = useAppNavigation();

  const { loginError } = useStoreState((store) => store.userModel);

  const { signIn, resetError } = useStoreActions((store) => store.userModel);

  const { fetchSymbols } = useStoreActions((store) => store.orderBookModel);

  useEffect(() => {
    if (loginError) {
      resetError();
      navigation.replace(RouteName.Login);
    }
  }, [loginError]);

  useEffect(() => {
    fetchSymbols();
    const credentials = getCredentials();
    if (credentials) {
      signIn(credentials);
    } else {
      navigation.replace(RouteName.Login);
    }
  }, []);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}>
        <Brand />
      </View>
    </SafeScreen>
  );
}

export default StartUpScreen;
