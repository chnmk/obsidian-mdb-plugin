import { Setting } from 'obsidian';
import { Database } from 'src/main';

/*
	Function to create a new song number 'num' in the current category,
	on the 'div' div of the modal window.
	The input will be added to the 'entries' section of the note.
*/
export const createEntryInput = (
	isEdit: boolean,
	div: HTMLElement, 
	obj: Database,
	catNumber: number,
	entryNumber: number,
	) => {
	
	const displayedNum = entryNumber+1
	
	new Setting(div)
		.setName("Entry #" + displayedNum)
		.addText((text) => {
			if (isEdit && obj.Contents != undefined) {
				text.setValue(obj.Contents[catNumber].Entries[entryNumber])
			}
			text.onChange((value) => {
				if (obj.Contents != undefined) {
					obj.Contents[catNumber].Entries[entryNumber] = value
				}
			})
		});
}