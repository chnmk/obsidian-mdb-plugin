import { Notice, FuzzySuggestModal } from 'obsidian';

// Interface to get "name" property from files after getMarkdownFiles():
interface ArtistNames {
	name: string;
}

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