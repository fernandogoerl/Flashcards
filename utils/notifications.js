import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
const NOTIFICATION_KEY = 'Flashcards:notifications'

export const clearLocalNotification = () => (
	AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
)

createNotification = () => ({
	title: 'Flashcards',
		body: "Don't forget to train your memory today!",
		ios: {
		sound: true,
	},
	android: {
		sound: true,
		priority: 'high',
		sticky: false,
		vibrate: true
	}
})


export const setLocalNotification = () => (
  AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
				.then(({status}) => {

					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync()

						let NotificationDate  = new Date(Date.now() + ((24 * 3600) * 1000)) //24 hours

						Notifications.scheduleLocalNotificationAsync(
							createNotification(),
							{
								time: NotificationDate,
								repeat: 'day'
							}
						)

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}
				})
			}
		})
)