import { App, ButtonComponent, Modal, Setting } from 'obsidian';
import { createCategoryDiv } from './components/create-category-div'; 

/*
	The note creation modal window.
*/
export class MDBCreateNote extends Modal {
	noteName: string;
	noteDesc: string;

	onSubmit: (noteName: string, noteDesc: string) => void;
	constructor(app: App, onSubmit: (noteName: string, noteDesc: string) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}
  
	onOpen() {
		
		const { contentEl } = this;

		let noteTags: string;
		let noteCats: string;
		let noteSongs: string;

		let catNumber = 1;

		new Setting(contentEl)
			.setHeading()
			.setName("Adding new artist...")

		const submitButtonEl = this.contentEl.createDiv(
			"submit-button-element"
		);
		submitButtonEl.style.marginBottom = '5%'


		new ButtonComponent(submitButtonEl)
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {
				this.noteDesc = this.noteDesc

				this.close();
				this.onSubmit(
					this.noteName, 
					this.noteDesc
					);
			})


		const artistInfo = contentEl.createDiv(
			"artist-info"
		);	

		new Setting(artistInfo)
			.setName("Info")
			.setHeading()

		new Setting(artistInfo)
			.setName("Artist name")
			.addText((text) =>
			text.onChange((value) => {
				this.noteName = value
			}));

		new Setting(artistInfo)
			.setName("Description")
			.addText((text) =>
			text.onChange((value) => {
				this.noteDesc = value
			}));

		new Setting(artistInfo)
			.setName("Tags")
			.addText((text) =>
			text.onChange((value) => {
				noteTags = noteTags + value
			}));

		const buttonEl = this.contentEl.createDiv(
			"cat-button-element"
		);
		buttonEl.style.textAlign = 'right'

		new ButtonComponent(buttonEl)
			.setButtonText("New group")
			.setCta()
			.onClick(() => {
				createCategoryDiv(artistInfo, catNumber++, noteCats, noteSongs)
			});
	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}

/*
this.noteDesc = `${this.noteDesc}

#${noteTags}

**${noteCats}**
* ${noteSongs}`
*/
				