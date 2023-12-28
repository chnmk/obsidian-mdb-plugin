import { Plugin } from 'obsidian';
import { MDBSelectAction } from './modal/modal-select';

// https://docs.obsidian.md/
// Obsidian developer tools: ctrl + shift + i.

// Main plugin class:
export default class MDBPlugin extends Plugin {
	async onload() {
		// Add an icon in the side bar:
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', (evt: MouseEvent) => {
			// Open the main modal window when the icon is clicked: 
			new MDBSelectAction(this.app).open()
		});
	}
}