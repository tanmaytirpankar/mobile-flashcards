import { getDecks } from '../utils/api.js'
import { receiveAllDecks } from './decks.js'

export function handleInitialData () {
	return (dispatch) => {
		return getDecks()
			.then((decks) => {
				dispatch(receiveAllDecks(decks))
			})
	}
}