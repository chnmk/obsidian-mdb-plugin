import { App, ButtonComponent, Modal, Notice, Plugin, Setting, FuzzySuggestModal } from 'obsidian';

// https://docs.obsidian.md/

interface ArtistNames {
	name: string;
}
  
export default class MDBPlugin extends Plugin {
	async onload() {
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', (evt: MouseEvent) => {
			new MDBSelectAction(this.app).open()
		});
	}
}

class MDBSelectAction extends Modal {

	onOpen() {

		const { contentEl } = this;
		contentEl.createEl("h1", { text: "MDB Plugin" });

		const buttonEl = this.contentEl.createDiv(
            "sample-button-element"
        );	

		new ButtonComponent(buttonEl)
		.setButtonText("Add artist")
		.setCta()
		.onClick(() => {
			this.close()
			new MDBCreateNote(this.app, (noteName, noteDesc) => {
				new Notice(`Note "${noteName}" created!`);
				this.app.vault.create(`${noteName}.md`, noteDesc)
			  }).open()
		});

		new ButtonComponent(buttonEl)
		.setButtonText("Add song")
		.setCta()
		.onClick(() => {
			this.close()
			new MDBAddSong(this.app).open()
		});

	}

}

class MDBCreateNote extends Modal {
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
		let noteGroups: string;
		let noteSongs: string;

		contentEl.createEl("h1", { text: "Adding new artist..." });

		new Setting(contentEl)
			.setName("Artist name")
			.addText((text) =>
			text.onChange((value) => {
				this.noteName = value
			}));

		new Setting(contentEl)
			.setName("Description")
			.addText((text) =>
			text.onChange((value) => {
				this.noteDesc = value
			}));

		new Setting(contentEl)
			.setName("Tags")
			.addText((text) =>
			text.onChange((tags) => {
				noteTags = tags
			}));

		new Setting(contentEl)
			.setName("Groups")
			.addText((text) =>
			text.onChange((groups) => {
				noteGroups = groups
			}));

		new Setting(contentEl)
			.setName("Songs")
			.addText((text) =>
			text.onChange((songs) => {
				noteSongs = songs
			}));

		new Setting(contentEl)
		.addButton((btn) =>
			btn
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {

				this.noteDesc = this.noteDesc

				/*
this.noteDesc = `${this.noteDesc}

#${noteTags}

**${noteGroups}**
* ${noteSongs}`
				*/

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

export class MDBAddSong extends FuzzySuggestModal<ArtistNames> {
	getItems(): ArtistNames[] {
	  return this.app.vault.getMarkdownFiles();
	}
  
	getItemText(book: ArtistNames): string {
	  return book.name;
	}
  
	onChooseItem(book: ArtistNames, evt: MouseEvent | KeyboardEvent) {
	  new Notice(`Selected ${book.name}`);
	}
  }