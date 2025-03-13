import { createNotifications, FadeInFadeOut } from "react-native-notificated";

import ToastDisplay from "./ToastDisplay";

import { deviceWidth } from "@/types/theme/responsive";

const TOAST_DISPLAY_TIME = 1500;

export const { notify, remove, NotificationsProvider } = createNotifications({
  variants: {
    success: {
      component: ToastDisplay,
      config: {
        duration: TOAST_DISPLAY_TIME,
        animationConfig: FadeInFadeOut,
        notificationWidth: deviceWidth,
      },
    },
    danger: {
      component: ToastDisplay,
      config: {
        duration: TOAST_DISPLAY_TIME,
        animationConfig: FadeInFadeOut,
        notificationWidth: deviceWidth,
      },
    },
    info: {
      component: ToastDisplay,
      config: {
        duration: TOAST_DISPLAY_TIME,
        animationConfig: FadeInFadeOut,
        notificationWidth: deviceWidth,
      },
    },
    reject: {
      component: ToastDisplay,
      config: {
        duration: TOAST_DISPLAY_TIME,
        animationConfig: FadeInFadeOut,
        notificationWidth: deviceWidth,
      },
    },
  },
});

const Toast = () => {
  return <NotificationsProvider />;
};

export default Toast;
