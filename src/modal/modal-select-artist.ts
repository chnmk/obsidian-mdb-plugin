import { App, Notice, FuzzySuggestModal } from 'obsidian';
import { Database } from 'src/main';
import { MDBEditArtist } from './modal-edit-artist'; 

export class MDBSelectArtist extends FuzzySuggestModal<Database> {
	databaseObj: Database[];
	constructor(app: App, databaseObj: Database[]) {
		super(app);
		this.databaseObj = databaseObj
	}

	getItems(): Database[] {
		// Get all files in the vault:
		return this.databaseObj
	}
  
	getItemText(artist: Database): string {
		// Get artist names:
		return artist.Name;
	}
  
	onChooseItem(artist: Database, evt: MouseEvent | KeyboardEvent) {
		if (artist.Name != "### New Artist ###") {
			new Notice(`Selected ${artist.Name}`);
		} else {
			new Notice(`Adding new artist...`);
		}

		// Open the next modal window:
		new MDBEditArtist(
			this.app, 
			this.databaseObj, 
			artist.Name, 
			(noteName, noteDesc) => {
				// Create a new note with the inputed title and content:
				this.app.vault.create(`${noteName}.md`, noteDesc)
				// Display a pop-up notice when the note is created:
				new Notice(`Note "${noteName}" created!`);
			}
		).open()
	}
}