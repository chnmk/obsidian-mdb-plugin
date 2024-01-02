import { Setting } from 'obsidian';
//import { CatsAndSongs } from '../modal-edit-note';

/*
	Function to create a new song number 'num' in the current category,
	on the 'div' div of the modal window.
	The input will be added to the 'songs' section of the note.
*/
export const createSongInput = (
	div: HTMLElement, 
	catNumber: number,
	songNumber: number,
	//catsAndSongs: CatsAndSongs
	) => {
	
	//catsAndSongs[catNumber].Songs.push("")
	const displayedNum = songNumber+1
	
	new Setting(div)
		.setName("Song #" + displayedNum)
		.addText((text) =>
		text.onChange((value) => {
			//catsAndSongs[catNumber].Songs[songNumber] = value
		}));
}