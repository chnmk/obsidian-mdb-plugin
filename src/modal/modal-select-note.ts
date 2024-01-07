import { App, Notice, FuzzySuggestModal } from 'obsidian';
import { Database } from 'src/main';
import { MDBEditNote } from './modal-edit-note'; 

// This window opens when the ribbon icon is clicked:
export class MDBSelectNote extends FuzzySuggestModal<Database> {
	databaseObj: Database[];
	constructor(app: App, databaseObj: Database[]) {
		super(app);
		this.databaseObj = databaseObj
	}

	getItems(): Database[] {
		// Get all files in the vault:
		return this.databaseObj
	}
  
	getItemText(note: Database): string {
		// Get note names:
		return note.Name;
	}
  
	onChooseItem(note: Database, evt: MouseEvent | KeyboardEvent) {
		if (note.Name != "### New Note ###") {
			new Notice(`Selected ${note.Name}`);
		} else {
			new Notice(`Adding new note...`);
		}

		// Open the next modal window:
		new MDBEditNote(
			this.app, 
			this.databaseObj, 
			note.Name, 
			// async is used because newNote is of promise type:
			async (noteName, noteDesc) => {
				// Create a new note with the inputed title and content:
				const newNote = await this.app.vault.create(`${noteName}.md`, noteDesc)
				// Display a pop-up notice when the note is created:
				new Notice(`Note "${noteName}" created!`);
				// Open created note:
				this.app.workspace.getLeaf(true).openFile(newNote)
			}
		).open()
	}
}