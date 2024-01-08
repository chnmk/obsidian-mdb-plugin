import { Plugin, Notice } from "obsidian";
import { loadDatabase } from "./json/load-database";

// database.json file type:
export type Database = {
  Name: string;
  Description?: string;
  Tags?: string[];
  Contents?: {
    Category: string;
    Entries: string[];
  }[];
};

// Main plugin class:
export default class MDBPlugin extends Plugin {
  async onload() {
    // Add an icon in the side bar:
    this.addRibbonIcon("file-volume", "MDB Plugin", async (evt: MouseEvent) => {
      // Notify user when the plugin starts:
      new Notice(`MDB plugin starting...`);
      // Load database.json and open the modal-select-note window:
      loadDatabase(this.app);
    });
  }
}
