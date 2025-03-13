import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { navigationRef } from "./NavigationUtils";

import { Setting, SignIn, SignUp, Spot, Trading } from "@/screens";
import MarketScreen from "@/screens/MarketScreen";
import { useTheme } from "@/theme";
import { ApplicationStackParamList, RouteName } from "@/types/navigation";

const Stack = createStackNavigator<ApplicationStackParamList>();

export const useAppNavigation = () => {
  return useNavigation<StackNavigationProp<ApplicationStackParamList>>();
};

export function useAppRouteParam<T extends keyof ApplicationStackParamList>() {
  const route = useRoute<RouteProp<ApplicationStackParamList, T>>();
  return route.params;
}

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <Stack.Navigator
        key={variant}
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name={RouteName.SignIn} component={SignIn} />
        <Stack.Screen name={RouteName.Market} component={MarketScreen} />
        <Stack.Screen name={RouteName.SignUp} component={SignUp} />
        <Stack.Screen name={RouteName.Trading} component={Trading} />
        <Stack.Screen name={RouteName.Spot} component={Spot} />
        <Stack.Screen name={RouteName.Setting} component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
