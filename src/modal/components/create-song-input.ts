import { Setting } from 'obsidian';

/*
	Function to create a new song number 'num' in the current category,
	on the 'div' div of the modal window.
	The input will be added to the 'songs' section of the note.
*/
export const createSongInput = (
	div: HTMLElement, 
	num: number, 
	songs: string[]
	) => {
	new Setting(div)
		.setName("Song #" + num)
		.addText((text) =>
		text.onChange((value) => {
			songs.push(value)
		}));
}