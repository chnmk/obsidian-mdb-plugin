import { App, ButtonComponent, Modal, Setting} from 'obsidian';

export class MDBCreateNote extends Modal {
	noteName: string;
	noteDesc: string;

	onSubmit: (noteName: string, noteDesc: string) => void;
	constructor(app: App, onSubmit: (noteName: string, noteDesc: string) => void) {
	  super(app);
	  this.onSubmit = onSubmit;
	}
  
	onOpen() {
		const { contentEl } = this;
		const buttonEl = this.contentEl.createDiv(
            "group-button-element"
        );	

		let noteTags: string;
		let noteGroups: string;
		let noteSongs: string;

		let groupNumber = 1;

		contentEl.createEl("h1", { text: "Adding new artist..." });

		new Setting(contentEl)
			.setName("Artist name")
			.addText((text) =>
			text.onChange((value) => {
				this.noteName = value
			}));

		new Setting(contentEl)
			.setName("Description")
			.addText((text) =>
			text.onChange((value) => {
				this.noteDesc = value
			}));

		new Setting(contentEl)
			.setName("Tags")
			.addText((text) =>
			text.onChange((value) => {
				noteTags = noteTags + value
			}));

		const buttonAddSong = (songNumber: number) => {
			new Setting(contentEl)
			.setName("Song " + songNumber)
			.addText((text) =>
			text.onChange((value) => {
				noteSongs = noteSongs + value
			}));
		}

		const buttonAddGroup = (groupNumber: number) => {

			let songNumber = 1;

			const buttonElNew = this.contentEl.createDiv(
				"add-group-element-" + groupNumber
			);	

			new Setting(contentEl)
			.setName("Group " + groupNumber)
			.addText((text) =>
			text.onChange((groups) => {
				noteGroups = groups
			}));

			buttonAddSong(songNumber++)

			new ButtonComponent(buttonElNew)
			.setButtonText("New song")
			.setCta()
			.onClick(() => {
				buttonAddSong(songNumber++)
			});

		}

		new ButtonComponent(buttonEl)
		.setButtonText("New group")
		.setCta()
		.onClick(() => {
			buttonAddGroup(groupNumber++)
		});

		new Setting(contentEl)
		.addButton((btn) =>
			btn
			.setButtonText("Submit")
			.setCta()
			.onClick(() => {

				//this.noteDesc = this.noteDesc

				
this.noteDesc = `${this.noteDesc}

#${noteTags}

**${noteGroups}**
* ${noteSongs}`
				

				this.close();
				this.onSubmit(
					this.noteName, 
					this.noteDesc
					);
			}));

	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}