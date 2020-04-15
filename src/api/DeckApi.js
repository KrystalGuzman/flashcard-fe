import {cards} from './deck.json';
// import {flashcards} from './Flashcards'

export default class DeckApi {


	static getCards(){
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(cards)
			}, 1000);
		});
	}
}