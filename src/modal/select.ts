import { ButtonComponent, Modal, Notice } from 'obsidian';
import { MDBCreateNote } from './create-note';
import { MDBAddSong } from './add-song';

// The main modal window that opens when the sidebar icon is clicked:
export class MDBSelectAction extends Modal {
	// Execute the following actions when the window opens:
	onOpen() {
		// Set the main div of the modal window:
		const { contentEl } = this;
		contentEl.style.textAlign = 'center'

		contentEl.createEl("h1", { text: "MDB Plugin" });

		// Add a new div for the selection buttons:
		const buttonsEl = this.contentEl.createDiv(
            "select-buttons"
        );
		buttonsEl.style.display = 'flex'
		buttonsEl.style.alignItems = 'center'
		buttonsEl.style.justifyContent = 'center'
		buttonsEl.style.gap = '15px'
		
		// Create a new button in the select-buttons div:
		new ButtonComponent(buttonsEl)
			.setButtonText("Add artist")
			.setCta()
			.onClick(() => {
				// Close the current window before switching to a new one:
				this.close()

				// Open the note creation window:
				new MDBCreateNote(this.app, (noteName, noteDesc) => {
					// Create a new note with the inputed title and content:
					this.app.vault.create(`${noteName}.md`, noteDesc)

					// Display a pop-up notice when the note is created:
					new Notice(`Note "${noteName}" created!`);

				}).open()
				
			});
		
		// Create a new button in the select-buttons div:
		new ButtonComponent(buttonsEl)
			.setButtonText("Add song")
			.setCta()
			.onClick(() => {

				// Close the current window before switching to a new one:
				this.close()

				// Open the song list window:
				new MDBAddSong(this.app).open()

			});

	}

}