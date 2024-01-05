import { App, ButtonComponent, Modal, Setting } from 'obsidian';
import { createCategoryDiv } from './components/create-category-div'; 
import { createTagDiv } from './components/create-tag-div';
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
        const isEdit = this.artistName != "### New Artist ###"
        let modifiedObj: Database;

        // Create the main object:
        if (isEdit) {
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
                // Final contents of the file:
                this.noteName = modifiedObj.Name
                this.noteDesc = ""

                if (modifiedObj.Description != undefined && modifiedObj.Description != "") {
                    this.noteDesc = modifiedObj.Description + "<br />"
                }
                if (modifiedObj.Tags != undefined) {
                    this.noteDesc = this.noteDesc + "<br />"
                    modifiedObj.Tags.forEach((t) => {
                        this.noteDesc = this.noteDesc + "#" + t + " "
                    })
                    this.noteDesc = this.noteDesc + "<br />"
                }
                if (modifiedObj.Contents != undefined) {
                    modifiedObj.Contents.forEach((e) => {
                        if (e.Category != "") {
                            this.noteDesc = this.noteDesc + "<br />**" + e.Category + "**<br />"
                        }
                        e.Songs.forEach((s) => {
                            if (s != "") {
                                this.noteDesc = this.noteDesc + "- " + s + "<br />"
                            }
                        })
                    })
                }

                // Change the json file:
                const filesArray = this.app.vault.getFiles();

                let newDatabase = this.databaseObj.filter(x => x.Name != this.artistName);
                newDatabase = newDatabase .filter(x => x.Name != modifiedObj.Name);
                newDatabase = newDatabase.filter(x => x.Name != "### New Artist ###");

                // Remove empty categories, then push and sort
                if (modifiedObj.Contents != undefined) {
                    modifiedObj.Contents.forEach(cat => cat.Songs.filter(s => s != ""))
                    modifiedObj.Contents = modifiedObj.Contents.filter(cat => (cat.Songs.length != 1 || cat.Songs[0] != "") || cat.Category != "")
                }
                newDatabase.push(modifiedObj)
                newDatabase.sort((a, b) => a.Name.localeCompare(b.Name));
                
                // Remove old data when editing an existing note:
                const databaseFile = filesArray.filter(e => e.name === 'database.json')[0]
                this.app.vault.modify(databaseFile, JSON.stringify(newDatabase))

                // Remove old .md file if needed: 
                const mdFile = filesArray.filter(e => e.name === this.artistName + '.md')[0]
                this.app.vault.delete(mdFile)

                this.close();
                this.onSubmit(
                    this.noteName, 
                    this.noteDesc
                    );
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
                if (isEdit) {
                    text.setValue(modifiedObj.Name)
                }
                text.onChange((value) => {
                    modifiedObj.Name = value
                })
            });

		new Setting(artistInfo)
			.setName("Description")
			.addText((text) => {
                if (isEdit && modifiedObj.Description != undefined) {
                    text.setValue(modifiedObj.Description)
                }
                text.onChange((value) => {
                    modifiedObj.Description = value
                })
			});


		///===============
		// Tags:

        const tagsEl = artistInfo.createDiv(
			"tags-element"
		);
        //tagsEl.style.textAlign = 'right'
        tagsEl.style.marginBottom = '5%'

        let tagNumber = 0;

        new Setting(tagsEl)
            .setHeading()
            .setName("Tags")
            .addButton((btn) => 
                btn
                .setButtonText("New tag")
                .setClass("new-tag-button")
                .setCta()
                .onClick(() => {
                    if (modifiedObj.Tags != undefined && modifiedObj.Tags.length > tagNumber) {
                        modifiedObj.Tags.push("")
                    } else {
                        modifiedObj.Tags = [""]
                    }
                    createTagDiv(isEdit, tagsEl, modifiedObj, tagNumber++)
                })
            )

		///===============
		// Categories and songs:

		const buttonEl = this.contentEl.createDiv(
			"cat-button-element"
		);
        buttonEl.style.marginTop = '2%'
		buttonEl.style.textAlign = 'right'

        let catNumber = 0;

		new ButtonComponent(buttonEl)
			.setButtonText("New category")
			.setCta()
			.onClick(() => {
                if (modifiedObj.Contents != undefined && modifiedObj.Contents.length > catNumber) {
                    modifiedObj.Contents.push({ Category: "", Songs: [""]})
                } else {
                    modifiedObj.Contents = [{ Category: "", Songs: [""]}]
                }
				createCategoryDiv(isEdit, artistInfo, modifiedObj, catNumber++)
			});
	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}