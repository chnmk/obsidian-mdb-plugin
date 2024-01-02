import { Setting } from 'obsidian';
import { Database } from 'src/main';

/*
	Function to create a new song number 'num' in the current category,
	on the 'div' div of the modal window.
	The input will be added to the 'songs' section of the note.
*/
export const createSongInput = (
	div: HTMLElement, 
	obj: Database,
	catNumber: number,
	songNumber: number,
	) => {
	
	const displayedNum = songNumber+1
	
	new Setting(div)
		.setName("Song #" + displayedNum)
		.addText((text) =>
		text.onChange((value) => {
			if (obj.Contents != undefined) {
				obj.Contents[catNumber].Songs[songNumber] = value
			}
		}));
}