import { App, ButtonComponent, Modal, Setting} from 'obsidian';

/*
	Function to create a button which when clicked adds a new input field number 'num'
	on the 'div' div of the modal window.
	The input will be added to the 'songs' section of the note.
*/
const buttonAddSong = (
	div: HTMLElement, 
	num: number, 
	songs: string
	) => {
	
	// TODO: fix new inputs being added only to the latest category
	new Setting(div)
	.setName("Song " + num)
	.addText((text) =>
	text.onChange((value) => {
		songs = songs + value
	}));

}

/* 
	Function to create a category of songs number 'num'.
	This adds a new section to the div 'div' of the 'window' modal window.
	Window = "this" when this function is called inside onOpen().

	TODO: make the following part true :)
	Each song 'songs' will be added to its respective category 'cats' in the note.
*/
const buttonAddCat = (
	window: Modal, 
	div: HTMLElement, 
	num: number, 
	songs: string, 
	cats: string 
	) => {

	let songNumber = 1;

	new Setting(div)
		.setName("Category " + num)
		.addText((text) =>
		text.onChange((value) => {
			cats = value
		}));

	buttonAddSong(div, songNumber++, songs)

	const buttonElNew = div.createDiv(
		"add-cat-element-" + num
	);	
	buttonElNew.style.textAlign = 'right'
	// TODO: border-top: none on some elements

	new ButtonComponent(buttonElNew)
		.setButtonText("New song")
		.setCta()
		.onClick(() => {
			buttonAddSong(div, songNumber++, songs)
		});

}

//

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

		contentEl.createEl("h1", { text: "Adding new artist..." });

		const artistInfo = contentEl.createDiv(
			"artist-info"
		);	

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
				buttonAddCat(this, artistInfo, catNumber++, noteCats, noteSongs)
			});

		new Setting(contentEl)
		.addButton((btn) =>
			btn
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {

				this.noteDesc = this.noteDesc

				this.close();
				this.onSubmit(
					this.noteName, 
					this.noteDesc
					);
			}));

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
				