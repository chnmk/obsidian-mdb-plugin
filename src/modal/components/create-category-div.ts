import { Setting } from 'obsidian';
import { createSongInput } from '../components/create-song-input';
import { Database } from 'src/main';

/* 
	Function to create a category of songs number 'num'.
	This adds a new section to the div 'div' of the 'window' modal window.
	Window = "this" when this function is called inside onOpen().

	Each song 'songs' will be added to its respective category 'cats' in the note.
*/
export const createCategoryDiv = (
	div: HTMLElement, 
	obj: Database,
	catNumber: number,
	) => {
	
	const currentDiv = div.createDiv(
		"category-" + catNumber
	);

	const displayedNum = catNumber+1
	let songNumber = 0

	new Setting(currentDiv)
		.setHeading()
		.setName("Category " + displayedNum)
		.addButton((btn) => 
			btn
			.setButtonText("New song")
			.setCta()
			.onClick(() => {
				createSongInput(currentDiv, obj, catNumber, songNumber++)
			})
		);

	new Setting(currentDiv)
		.setName("Category name")
		.addText((text) =>
		text.onChange((value) => {
			if (obj.Contents != undefined) {
				obj.Contents[catNumber].Category = value
			}
		}));

	createSongInput(currentDiv, obj, catNumber, songNumber++)
}