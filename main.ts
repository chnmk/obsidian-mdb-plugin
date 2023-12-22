import { App, ButtonComponent, Modal, Notice, Plugin, Setting } from 'obsidian';

// https://docs.obsidian.md/
// https://docs.obsidian.md/Reference/TypeScript+API/Setting

export default class MDBPlugin extends Plugin {
	async onload() {

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('file-volume', 'MusicDB Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new MDBCreateNote(this.app, (noteName, noteDesc) => {
				new Notice(`Note "${noteName}" created!`);
				this.app.vault.create(`${noteName}.md`, noteDesc)
			  }).open()
			
		});
		
	}

	onunload() {

	}

}

class MDBCreateNote extends Modal {
	noteName: string;
	noteDesc: string;
	onSubmit: (noteName: string, noteDesc: string) => void;
  
	constructor(app: App, onSubmit: (noteName: string, noteDesc: string) => void) {
	  super(app);
	  this.onSubmit = onSubmit;
	}
  
	onOpen() {
		const { contentEl } = this;


		contentEl.createEl("h1", { text: "MDB Plugin" });

		const buttonEl = this.contentEl.createDiv(
            "sample-button-element"
        );
		new ButtonComponent(buttonEl)
			.setButtonText("Add artist")
			.setCta()
			.onClick(() => {
				
				contentEl.createEl("h1", { text: "What's your name?" });
	
				new Setting(contentEl)
					.setName("Name")
					.addText((text) =>
					text.onChange((value) => {
						this.noteName = value
					}));
		
				new Setting(contentEl)
					.setName("Description_temp")
					.addText((text) =>
					text.onChange((value) => {
						this.noteDesc = value
					}));
	
				new Setting(contentEl)
				.addButton((btn) =>
					btn
					.setButtonText("Submit")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(this.noteName, this.noteDesc);
					}));

			});

		new ButtonComponent(buttonEl)
		.setButtonText("Add song")
		.setCta()
		.onClick(() => {
			this.close()
		});

	}
  
	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
