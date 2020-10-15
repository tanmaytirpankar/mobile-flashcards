import { RECEIVE_ALL_DECKS, SAVE_DECK, SAVE_CARD, REMOVE_DECK } from './actionTypes.js'

export function receiveAllDecks (decks) {
	return {
		type: RECEIVE_ALL_DECKS,
		decks,
	}
}

export function saveNewDeck (decktitle) {
	return {
		type: SAVE_DECK,
		decktitle,
	}
}

export function saveNewCard (decktitle, card) {
	return {
		type: SAVE_CARD,
		decktitle,
		card,
	}
}

export function removeDeck (decktitle) {
	return {
		type: REMOVE_DECK,
		decktitle,
	}
}