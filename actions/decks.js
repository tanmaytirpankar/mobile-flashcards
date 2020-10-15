export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS'
export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_CARD = 'SAVE_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

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