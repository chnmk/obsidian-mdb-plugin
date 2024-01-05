import { Setting } from 'obsidian';
import { Database } from 'src/main';

export const createTagDiv = (
	isEdit: boolean,
	div: HTMLElement, 
	obj: Database,
	tagNumber: number,
	) => {
	
	const currentDiv = div.createDiv(
		"tag-" + tagNumber
	);
    const displayedNumebr = tagNumber + 1

	new Setting(currentDiv)
		.setName("Tag #" + displayedNumebr)
		.addText((text) => {
			if (isEdit && obj.Tags != undefined) {
				text.setValue(obj.Tags[tagNumber])
			}
			text.onChange((value) => {
				if (obj.Tags != undefined) {
					obj.Tags[tagNumber] = value
				}
				})
		});
}