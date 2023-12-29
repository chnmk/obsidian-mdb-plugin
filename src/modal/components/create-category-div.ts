import { Setting } from 'obsidian';
import { createSongInput } from '../components/create-song-input';

type CatsAndSongs = [{
	Category: string;
	Songs: string[];
}]

/* 
	Function to create a category of songs number 'num'.
	This adds a new section to the div 'div' of the 'window' modal window.
	Window = "this" when this function is called inside onOpen().

	Each song 'songs' will be added to its respective category 'cats' in the note.
*/
export const createCategoryDiv = (
	div: HTMLElement, 
	num: number, 
	catsAndSongs: CatsAndSongs
	) => {
	
	let songNumber = 1;
	const currentDiv = div.createDiv(
		"category-" + num
	);	

	new Setting(currentDiv)
		.setHeading()
		.setName("Category " + num)
		.addButton((btn) => 
			btn
			.setButtonText("New song")
			.setCta()
			.onClick(() => {
				createSongInput(currentDiv, songNumber++, catsAndSongs[num].Songs)
			})
		);

	new Setting(currentDiv)
		.setName("Category name")
		.addText((text) =>
		text.onChange((value) => {
			catsAndSongs[num].Category = value
		}));

	createSongInput(currentDiv, songNumber++, catsAndSongs[num].Songs)
}