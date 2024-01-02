import { Plugin, Notice } from 'obsidian';
import { MDBCreateNote } from './modal/modal-create-note'; 

// https://docs.obsidian.md/
// Obsidian developer tools: ctrl + shift + i.

// Main plugin class:
export default class MDBPlugin extends Plugin {
	async onload() {
		// Add an icon in the side bar:
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', (evt: MouseEvent) => {
			// Open the note creation window:
			new MDBCreateNote(this.app, (noteName, noteDesc) => {
				// Create a new note with the inputed title and content:
				this.app.vault.create(`${noteName}.md`, noteDesc)
				// Display a pop-up notice when the note is created:
				new Notice(`Note "${noteName}" created!`);
			}).open()
		});
	}
}