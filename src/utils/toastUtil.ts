import Toast, {ToastPosition} from 'react-native-toast-message';

export const showToast = (
  type: string,
  message: string,
  messageSub: string,
  position: ToastPosition | undefined,
  visibilityTime: number | 3000,
): void => {
  Toast.show({
    type: type,
    position: position,
    text1: message,
    text2: messageSub,
    visibilityTime: visibilityTime,
    autoHide: true,
  });
};
