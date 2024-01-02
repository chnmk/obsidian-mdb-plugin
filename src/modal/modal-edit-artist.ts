import { App, ButtonComponent, Modal, Setting } from 'obsidian';
import { createCategoryDiv } from './components/create-category-div'; 
import { Database } from 'src/main';

// This window opens when the "Add song" button in modal-select is clicked:
export class MDBEditArtist extends Modal {
    // Arguments recieved from the select window:
	noteName: string;
	noteDesc: string;
    artistName: string;
    databaseObj: Database[];
	onSubmit: (noteName: string, noteDesc: string) => void;

	constructor(
        app: App, 
        databaseObj: Database[], 
        artistName: string,
        onSubmit: (noteName: string, noteDesc: string) => void
        ) {
            super(app);
            this.onSubmit = onSubmit;
            this.databaseObj = databaseObj
            this.artistName = artistName
	    }
  
	onOpen() {
		// Set the main div of the modal window:
		const { contentEl } = this;
        let modifiedObj: Database;

        // Create the main object:
        if (this.artistName != "### New Artist ###") {
            const currentObj = this.databaseObj.filter(x => x.Name === this.artistName)[0];
            modifiedObj = currentObj
        } else {
            modifiedObj = { Name: "" }
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
                if (this.artistName === "### New Artist ###") {
				    // Final contents of the file:
                    this.noteName = modifiedObj.Name

                    if (modifiedObj.Description != undefined) {
                        this.noteDesc = modifiedObj.Description
                    }
                    if (modifiedObj.Tag != undefined) {
                        this.noteDesc = this.noteDesc + modifiedObj.Tag
                    }
                    if (modifiedObj.Contents != undefined) {
                        modifiedObj.Contents.forEach((e) => {
                            this.noteDesc = this.noteDesc + e.Songs
                        })
                    }

                    // Change the json file:
                    const filesArray = this.app.vault.getFiles();
                    let databaseFile = filesArray.filter(e => e.name === 'database.json')[0]

                    const newDatabase = this.databaseObj.filter(x => x.Name !== this.artistName);
                    newDatabase.push(modifiedObj)

                    this.app.vault.modify(databaseFile, JSON.stringify(newDatabase))

                    // Close the window:
                    this.close();
                    this.onSubmit(
                        this.noteName, 
                        this.noteDesc
                        );
                }
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
			.addText((text) => {
                text.setPlaceholder(this.artistName)
                text.onChange((value) => {
                    modifiedObj.Name = value
                })
            });

		new Setting(artistInfo)
			.setName("Description")
			.addText((text) =>
			text.onChange((value) => {
                modifiedObj.Description = value
			}));

		new Setting(artistInfo)
			.setName("Tag")
            .addDropdown((drop) => {
                drop.addOption("Placeholder", "Placeholder")
            })
			.addExtraButton((btn) => {
                btn.onClick(() => {
                    // Add tag editor window
                })
			});

		///===============
		// Categories and songs:

		const buttonEl = this.contentEl.createDiv(
			"cat-button-element"
		);
		buttonEl.style.textAlign = 'right'

        let catNumber = 0;

		new ButtonComponent(buttonEl)
			.setButtonText("New category")
			.setCta()
			.onClick(() => {
                if (modifiedObj.Contents != undefined) {
                    modifiedObj.Contents.push({ Category: "", Songs: [""]})
                } else {
                    modifiedObj.Contents = [{ Category: "", Songs: [""]}]
                }
				createCategoryDiv(artistInfo, modifiedObj, catNumber++)
			});
	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}