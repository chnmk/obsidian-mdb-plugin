import { Setting } from 'obsidian';
import { createEntryInput } from './create-entry-input';
import { Database } from 'src/main';

export const createCategoryDiv = (
	isEdit: boolean,
	div: HTMLElement, 
	obj: Database,
	catNumber: number,
	) => {
	
	const currentDiv = div.createDiv(
		"category-" + catNumber
	);

	const displayedNum = catNumber+1
	let entryNumber = 0

	new Setting(currentDiv)
		.setHeading()
		.setName("Category " + displayedNum)
		.addButton((btn) => 
			btn
			.setButtonText("New entry")
			.setCta()
			.onClick(() => {
				createEntryInput(isEdit, currentDiv, obj, catNumber, entryNumber++)
			})
		);

	new Setting(currentDiv)
		.setName("Category name")
		.addText((text) => {
			if (isEdit && obj.Contents != undefined) {
				text.setValue(obj.Contents[catNumber].Category)
			}
			text.onChange((value) => {
				if (obj.Contents != undefined) {
					obj.Contents[catNumber].Category = value
				}
				})
		});

	createEntryInput(isEdit, currentDiv, obj, catNumber, entryNumber++)
}