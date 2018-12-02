import { AsyncStorage } from 'react-native'
import { defaultData } from './_DATA';

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

hasData = (items) => {
	if (items !== null) {
		return JSON.parse(items)
	}
	AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(defaultData))
	return defaultData
}


export const getAllDecks = () => {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(hasData)
}

export const getDeck = (id) => (
	AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(hasData)
		.then((items) => ( items[id] ))
)

export const saveDeckTitle = (title) => (
 	AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}})
	))

export const addCardToDeck = (title, inputs) => (
	AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(data => {
			decks = JSON.parse(data)
			decks[title].questions.push(inputs)
			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
		})
)