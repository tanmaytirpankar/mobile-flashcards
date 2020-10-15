import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'Decks'

export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((decks) => {
			return JSON.parse(decks)
		})
}

export function getDeck(id) {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((deck) => {
			data = JSON.parse(deck)
			return data[id]
		})
}

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[title]: {
			title:title,
			questions: [],
		}
	}))
}

export function removeDeckTitle(title) {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[title] = undefined
			delete data[title]
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
		})
}

export function addCardToDeck(title, card) {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[title].questions.push(card)
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
		})
}



export function clearDataBase() {
	data={}
	return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}