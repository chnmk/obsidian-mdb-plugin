import { App, Modal, Setting } from 'obsidian';

export class MDBEditTags extends Modal {

    tags: string[]

    constructor(
        app: App,
        //tags: string[],
        //onSubmit: (noteName: string, noteDesc: string) => void
        ) {
            super(app)
            //this.tags = tags
            //this.onSubmit = onSubmit;
	    }

    onOpen() {
        const { contentEl } = this;
        new Setting(contentEl)
            .setHeading()
            .setName("Tags")
    }

}