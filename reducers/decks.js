import { RECEIVE_ALL_DECKS, SAVE_DECK, SAVE_CARD, REMOVE_DECK } from '../actions/decks.js'

export default function decks (state={}, action) {
	switch(action.type) {
		case RECEIVE_ALL_DECKS:
			return {
				...state,
				...action.decks,
			}
		case SAVE_DECK:
			return {
				...state,
				[action.decktitle]: {
					title: action.decktitle,
					questions: [],
				}
			}
		case SAVE_CARD:
			return {
				...state,
				[action.decktitle]: deck(state[action.decktitle], action)
			}
		case REMOVE_DECK:
			new_state = state
			delete new_state[action.decktitle]
			return {
				...new_state,
			}
		default:
			return state
	}
}

function deck (state, action) {
	switch(action.type) {
		case SAVE_CARD:
			questions=state.questions
			questions.push(action.card)
			return {
				...state,
				questions: questions,
			}
		default:
			return state
	}
}
