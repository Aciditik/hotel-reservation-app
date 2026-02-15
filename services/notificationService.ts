import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const scheduleBookingConfirmation = async (
  hotelName: string,
  checkIn: string
): Promise<void> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Booking Confirmed! 🎉',
        body: `Your reservation at ${hotelName} for ${checkIn} has been confirmed.`,
        data: { hotelName, checkIn },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const scheduleCheckInReminder = async (
  hotelName: string,
  checkIn: string
): Promise<void> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Check-in Reminder 📅',
        body: `Don't forget! Your check-in at ${hotelName} is tomorrow.`,
        data: { hotelName, checkIn },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });
  } catch (error) {
    console.error('Error scheduling reminder:', error);
  }
};
