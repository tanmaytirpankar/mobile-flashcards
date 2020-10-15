import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification(tomorrow) {
	return {
		content: {
			title: 'Quiz Reminder',
			body: "Don't forget to take a quiz today",
		},
		trigger: tomorrow
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data===null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status==='granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							// console.log(new Date(Date.now()).getDate()+1)
							let tomorrow = new Date()
							tomorrow.setDate(new Date(Date.now()).getDate()+1)
							tomorrow.setHours(20)
							tomorrow.setMinutes(0)

							Notifications.setNotificationHandler({
								handleNotification: async () => ({
								    shouldShowAlert: true,
								    shouldPlaySound: true,
								    shouldSetBadge: false,
								    priority: 'high',
								}),
							})

							Notifications.scheduleNotificationAsync(
								createNotification(tomorrow)
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}