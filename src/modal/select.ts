import { ButtonComponent, Modal, Notice } from 'obsidian';
import { MDBCreateNote } from './create-note';
import { MDBAddSong } from './add-song';

// Main modal window:
export class MDBSelectAction extends Modal {

	onOpen() {
		
		const { contentEl } = this;
		contentEl.createEl("h1", { text: "MDB Plugin" });

		const buttonEl = this.contentEl.createDiv(
            "select-button-element"
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