import { Plugin, Notice } from 'obsidian';
import { MDBSelectArtist } from './modal/modal-select-artist';

// https://docs.obsidian.md/
// Obsidian developer tools: ctrl + shift + i.

// Declare type for the database.json file:
export type Database = {
	Name: string;
	Description?: string;
	Tag?: string;
	Contents?: {
		Category: string;
		Songs: string[];
	}[]
}

// Main plugin class:
export default class MDBPlugin extends Plugin {
	async onload() {
		// Add an icon in the side bar:
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', async (evt: MouseEvent) => {
			// Notify user when the plugin starts:
			new Notice(`MusicDB plugin starting...`);

			// Check if database.json exists:
			const filesArray = this.app.vault.getFiles();

			if (filesArray.some(e => e.name === 'database.json')) {
				// Select, read and parse database.json:
				let databaseFile = filesArray.filter(e => e.name === 'database.json')[0]
				let databaseFileContent = await this.app.vault.read(databaseFile)
				let databaseObj: Database[];

				try { 
					// If database.json exists and is of Database[] type:
					databaseObj = JSON.parse(databaseFileContent)
					databaseObj.unshift({Name: "### New Artist ###"})
				} catch {
					// If database.json exists but isn't a Database[]:
					new Notice(`database.json file is corrupted!`);
					databaseObj = [{Name: "### New Artist ###"}]
				}
				// Open the artist selection window:
				new MDBSelectArtist(this.app, databaseObj).open()

			} else {
				// If database.json doesn't exist:
				this.app.vault.create('database.json', '')
				let databaseObj: Database[] = [{Name: "### New Artist ###"}]
				new MDBSelectArtist(this.app, databaseObj).open()
			}
		});
	}
}