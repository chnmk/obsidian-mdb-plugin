import { App, Notice, TFile } from "obsidian";
import { Database } from "src/main";
import { MDBSelectNote } from "../modal/modal-select-note";

export async function loadDatabase(app: App) {
	// Check if database.json exists:
    const filesArray = this.app.vault.getFiles();

    if (filesArray.some((e: TFile) => e.name === 'database.json')) {
        // Select, read and parse database.json:
        let databaseFile = filesArray.filter((e: TFile) => e.name === 'database.json')[0]
        let databaseFileContent = await this.app.vault.read(databaseFile)
        let databaseObj: Database[];

        try { 
            // If database.json exists and is of Database[] type:
            databaseObj = JSON.parse(databaseFileContent)
            databaseObj.unshift({Name: "### New Note ###"})
        } catch {
            // If database.json exists but isn't a Database[]:
            new Notice(`database.json file is corrupted!`);
            databaseObj = [{Name: "### New Note ###"}]
        }
        // Open the note selection window:
        new MDBSelectNote(this.app, databaseObj).open()

    } else {
        // If database.json doesn't exist:
        this.app.vault.create('database.json', '')
        let databaseObj: Database[] = [{Name: "### New Note ###"}]
        new MDBSelectNote(this.app, databaseObj).open()
    }
}