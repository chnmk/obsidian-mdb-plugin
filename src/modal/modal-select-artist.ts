import { Notice, FuzzySuggestModal } from 'obsidian';

// Interface to get "name" property from files after getMarkdownFiles():
interface ArtistNames {
	name: string;
}

export class MDBSelectArtist extends FuzzySuggestModal<ArtistNames> {
	getItems(): ArtistNames[] {
		// Get all files in the vault:
		return this.app.vault.getMarkdownFiles();
	}
  
	getItemText(book: ArtistNames): string {
		// Get artist names:
		return book.name;
	}
  
	onChooseItem(book: ArtistNames, evt: MouseEvent | KeyboardEvent) {
		new Notice(`Selected ${book.name}`);
	}
}

/*
// Open the note creation window:
new MDBCreateNote(this.app, (noteName, noteDesc) => {
	// Create a new note with the inputed title and content:
	this.app.vault.create(`${noteName}.md`, noteDesc)
	// Display a pop-up notice when the note is created:
	new Notice(`Note "${noteName}" created!`);
}).open()
*/