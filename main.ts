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

		contentEl.createEl("h1", { text: "What's your name?" });

		new Setting(contentEl)
			.setName("Name")
			.addText((text) =>
			text.onChange((value) => {
				this.noteName = value
			}));

		new Setting(contentEl)
			.setName("Description_temp")
			.addText((text) =>
			text.onChange((value) => {
				this.noteDesc = value
			}));

		new Setting(contentEl)
		.addButton((btn) =>
			btn
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {
				this.close();
				this.onSubmit(this.noteName, this.noteDesc);
			}));

	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}

/*
class MDBAddSong extends Modal {
	noteName: string;
	noteDesc: string;
	onSubmit: (noteName: string, noteDesc: string) => void;
  
	constructor(app: App, onSubmit: (noteName: string, noteDesc: string) => void) {
	  super(app);
	  this.onSubmit = onSubmit;
	}
  
	onOpen() {
		const { contentEl } = this;

		// Remove this:
		const fiels = this.app.vault.getMarkdownFiles()
		contentEl.createEl("h1", { text: fiels[0].name });

		new Setting(contentEl)
			.setName("Name")
			.addText((text) =>
			text.onChange((value) => {
				this.noteName = value
			}));

		new Setting(contentEl)
			.setName("Description_temp")
			.addText((text) =>
			text.onChange((value) => {
				this.noteDesc = value
			}));

		new Setting(contentEl)
		.addButton((btn) =>
			btn
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {
				this.close();
				this.onSubmit(this.noteName, this.noteDesc);
			}));

	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
*/

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