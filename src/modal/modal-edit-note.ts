import { App, ButtonComponent, Modal, PopoverSuggest, Setting, fuzzySearch } from 'obsidian';
import { createCategoryDiv } from './components/create-category-div'; 

export type Database = {
	Name: string;
	Description: string | undefined;
	Tags: string[] | undefined;
	Contents: {
		Category: string;
		Songs: string[];
	}[] | undefined
}[]

/*
export type CatsAndSongs = {
	Category: string;
	Songs: string[];
}[]
*/

// This window opens when the "Add song" button in modal-select is clicked:
export class MDBEditNote extends Modal {
	// Name of the new note:
	noteName: string;
	// Contents of the new note: 
	noteDesc: string;
	
	// Send the name and the contents to this.app.vault.create in main.ts:
	onSubmit: (noteName: string, noteDesc: string) => void;
	constructor(app: App, onSubmit: (noteName: string, noteDesc: string) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}
  
	onOpen() {
		// Set the main div of the modal window:
		const { contentEl } = this;

		const emptyArtist = {
			Name: ""
		}
		
		/*
		const defaulltObj = { Category: "", Songs: [""] };

		let catsAndSongs = [defaulltObj];
		let catNumber = 0;
		let noteTags: string[];
		*/

		// Look for the json file:
		const filesArray = this.app.vault.getFiles();

		if (filesArray.some(e => e.name === 'database.json')) {
			let database = filesArray.filter(e => e.name === 'database.json')
		} else {
			let database: Database;
			this.app.vault.create('database.json', '')
		}

		///===============
		// Main header, submit-button div:
		new Setting(contentEl)
			.setHeading()
			.setName("Adding new artist...")

		const submitButtonEl = this.contentEl.createDiv(
			"submit-button-element"
		);
		submitButtonEl.style.marginBottom = '5%'

		new ButtonComponent(submitButtonEl)
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {
				/*
				// Final contents of the file:
				this.noteDesc = this.noteDesc + noteTags + catsAndSongs

				this.close();
				this.onSubmit(
					this.noteName, 
					this.noteDesc
					);
				*/
			})
		///===============
		// Artist-info div:

		const artistInfo = contentEl.createDiv(
			"artist-info"
		);	

		new Setting(artistInfo)
			.setName("Info")
			.setHeading()

		new Setting(artistInfo)
			.setName("Artist name")
			.addText((text) =>
			text.onChange((value) => {
				/*
				this.noteName = value
				*/
			}));


		let q = {
			fuzzy: ["myFuzzy"],
			query: "myQuery",
			tokens: ["myTokens"]
		}
		fuzzySearch(q, "texthello")


		new Setting(artistInfo)
			.setName("Artist name 2")
			.addSearch((text) =>
			text.onChange((value) => {
				/*
				this.noteName = value
				*/
			}));

		new Setting(artistInfo)
			.setName("Description")
			.addText((text) =>
			text.onChange((value) => {
				/*
				this.noteDesc = value
				*/
			}));

		new Setting(artistInfo)
			.setName("Tags")
			.addText((text) =>
			text.onChange((value) => {
				/*
				noteTags[0] = value
				*/
			}));

		///===============
		// Categories and songs:

		const buttonEl = this.contentEl.createDiv(
			"cat-button-element"
		);
		buttonEl.style.textAlign = 'right'

		new ButtonComponent(buttonEl)
			.setButtonText("New category")
			.setCta()
			.onClick(() => {
				/*
				catsAndSongs.push(defaulltObj)
				createCategoryDiv(artistInfo, catNumber++, catsAndSongs)
				*/
			});
	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}