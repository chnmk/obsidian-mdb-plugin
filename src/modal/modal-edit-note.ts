import { App, ButtonComponent, Modal, Setting } from "obsidian";
import { createCategoryInput } from "../input/create-category-input";
import { createTagInput } from "../input/create-tag-input";
import { Database } from "src/main";

// This window opens when any option in modal-select-note is selected:
export class MDBEditNote extends Modal {
  // Arguments recieved from the select window:
  noteName: string;
  noteDesc: string;
  selectedName: string;
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
    this.databaseObj = databaseObj;
    this.selectedName = artistName;
  }

  onOpen() {
    // Set the main div of the modal window:
    const { contentEl } = this;
    const isEdit = this.selectedName != "### New Note ###";
    let modifiedObj: Database;

    // Create the main object:
    if (isEdit) {
      const currentObj = this.databaseObj.filter(
        (x) => x.Name === this.selectedName
      )[0];
      modifiedObj = currentObj;
    } else {
      modifiedObj = { Name: "" };
    }

    ///===============
    // Main header, submit-button div:
    new Setting(contentEl).setHeading().setName("Adding new note...");

    // Submit button div:
    const submitButtonEl = this.contentEl.createDiv("submit-button-element");
    submitButtonEl.style.marginBottom = "5%";

    // Submit button:
    new ButtonComponent(submitButtonEl)
      .setButtonText("Submit")
      .setCta()
      .onClick(() => {
        // Final contents of the new note:
        this.noteName = modifiedObj.Name;
        this.noteDesc = "";

        // Set note description:
        if (
          modifiedObj.Description != undefined &&
          modifiedObj.Description != ""
        ) {
          this.noteDesc = modifiedObj.Description + "<br />";
        }

        // Set note tags:
        if (modifiedObj.Tags != undefined) {
          this.noteDesc = this.noteDesc + "<br />";
          modifiedObj.Tags.forEach((t) => {
            if (t != "") {
              // Replace spaces with underscores for obsidian tags:
              const t_underscore = t.split(" ").join("_");
              this.noteDesc = this.noteDesc + "#" + t_underscore + " ";
            }
          });
          this.noteDesc = this.noteDesc + "<br />";
        }

        // Set note categories and entries:
        if (modifiedObj.Contents != undefined) {
          // Set categories:
          modifiedObj.Contents.forEach((c) => {
            if (c.Category != "") {
              this.noteDesc =
                this.noteDesc + "<br />**" + c.Category + "**<br />";
            }
            // Set entries:
            c.Entries.forEach((e) => {
              if (e != "") {
                this.noteDesc = this.noteDesc + "- " + e + "<br />";
              }
            });
          });
        }

        // Change the json file:
        const filesArray = this.app.vault.getFiles();

        let newDatabase = this.databaseObj.filter(
          (x) => x.Name != this.selectedName
        );
        newDatabase = newDatabase.filter((x) => x.Name != modifiedObj.Name);
        newDatabase = newDatabase.filter((x) => x.Name != "### New Note ###");

        // Remove empty categories and tags, then push and sort
        if (modifiedObj.Contents != undefined) {
          modifiedObj.Contents.forEach((cat) =>
            cat.Entries.filter((s) => s != "")
          );
          modifiedObj.Contents = modifiedObj.Contents.filter(
            (cat) =>
              cat.Entries.length != 1 ||
              cat.Entries[0] != "" ||
              cat.Category != ""
          );
        }
        if (modifiedObj.Tags != undefined) {
          modifiedObj.Tags = modifiedObj.Tags.filter((t) => t != "");
        }
        newDatabase.push(modifiedObj);
        newDatabase.sort((a, b) => a.Name.localeCompare(b.Name));

        // Remove old data when editing an existing note:
        const databaseFile = filesArray.filter(
          (e) => e.name === "database.json"
        )[0];
        this.app.vault.modify(databaseFile, JSON.stringify(newDatabase));

        // Remove old .md file if needed:
        const mdFile = filesArray.filter(
          (e) => e.name === this.selectedName + ".md"
        )[0];
        this.app.vault.delete(mdFile);

        // Submit the new note:
        this.close();
        this.onSubmit(this.noteName, this.noteDesc);
      });

    ///===============
    // Note-info div:
    const noteInfo = contentEl.createDiv("note-info");

    // Header:
    new Setting(noteInfo).setName("Info").setHeading();

    // Note name input:
    new Setting(noteInfo).setName("Note name").addText((text) => {
      if (isEdit) {
        text.setValue(modifiedObj.Name);
      }
      text.onChange((value) => {
        modifiedObj.Name = value;
      });
    });

    // Note description input:
    new Setting(noteInfo).setName("Description").addTextArea((text) => {
      if (isEdit && modifiedObj.Description != undefined) {
        text.setValue(modifiedObj.Description);
      }
      text.onChange((value) => {
        modifiedObj.Description = value;
      });
    });

    ///===============
    // Tags div:
    const tagsEl = noteInfo.createDiv("tags-element");
    tagsEl.style.marginBottom = "5%";

    // New tag button:
    let tagNumber = 0;
    new Setting(tagsEl)
      .setHeading()
      .setName("Tags")
      .addButton((btn) =>
        btn
          .setButtonText("New tag")
          .setClass("new-tag-button") // styles.css
          .setCta()
          .onClick(() => {
            // When the button is clicked, push a new string to the tags array:
            if (
              modifiedObj.Tags != undefined &&
              modifiedObj.Tags.length >= tagNumber
            ) {
              modifiedObj.Tags.push("");
            } else {
              modifiedObj.Tags = [""];
            }
            // Then create a new tag input:
            createTagInput(isEdit, tagsEl, modifiedObj, tagNumber++);
          })
      );

    ///===============
    // Categories and songs div:
    const buttonEl = this.contentEl.createDiv("cat-button-element");
    buttonEl.style.marginTop = "2%";
    buttonEl.style.textAlign = "right";

    // New category button:
    let catNumber = 0;
    new ButtonComponent(buttonEl)
      .setButtonText("New category")
      .setCta()
      .onClick(() => {
        // When the button is clicked, push a new object to the contents array:
        if (
          modifiedObj.Contents != undefined &&
          modifiedObj.Contents.length >= catNumber
        ) {
          modifiedObj.Contents.push({ Category: "", Entries: [""] });
        } else {
          modifiedObj.Contents = [{ Category: "", Entries: [""] }];
        }
        // Then create a new category input:
        createCategoryInput(isEdit, noteInfo, modifiedObj, catNumber++);
      });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
