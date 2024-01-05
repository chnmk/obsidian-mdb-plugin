import { App, Modal, Setting, ButtonComponent } from 'obsidian';

export class MDBEditTags extends Modal {

    tags: string[]

    constructor(
        app: App,
        tags: string[],
        ) {
            super(app)
            this.tags = tags
	    }

    onOpen() {

        const { contentEl } = this;

        new Setting(contentEl)
            .setHeading()
            .setName("Tags")
            .addDropdown((drop) => {
                this.tags.forEach(t => {
                    drop.addOption(t, t)
                })
            })

		new ButtonComponent(contentEl)
			.setButtonText("Remove tag")
			.setCta()
			.onClick(() => {

			});

        new Setting(contentEl)
			.setName("Enter new tag...")
			.addText((text) => {

            });

        new ButtonComponent(contentEl)
			.setButtonText("Add tag")
			.setCta()
			.onClick(() => {

			});
    }

}