import { Plugin, Notice } from 'obsidian';
import { MDBEditNote } from './modal/modal-edit-note'; 
import { MDBSelectArtist } from './modal/modal-select-artist';

// https://docs.obsidian.md/
// Obsidian developer tools: ctrl + shift + i.

// Main plugin class:
export default class MDBPlugin extends Plugin {
	async onload() {
		// Add an icon in the side bar:
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', (evt: MouseEvent) => {
			new MDBSelectArtist(this.app).open()
		});
	}
}