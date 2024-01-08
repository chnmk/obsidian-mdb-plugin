import { Setting } from "obsidian";
import { createEntryInput } from "./create-entry-input";
import { Database } from "src/main";

// This function is used when the "New Category" button is clicked:
export const createCategoryInput = (
  isEdit: boolean,
  div: HTMLElement,
  obj: Database,
  catNumber: number
) => {
  // Create a separate div for the new category:
  const currentDiv = div.createDiv("category-" + catNumber);

  // Create a "New entry" button for this category:
  const displayedNum = catNumber + 1;
  let entryNumber = 0;
  new Setting(currentDiv)
    .setHeading()
    .setName("Category " + displayedNum)
    .addButton((btn) =>
      btn
        .setButtonText("New entry")
        .setCta()
        .onClick(() => {
          createEntryInput(isEdit, currentDiv, obj, catNumber, entryNumber++);
        })
    );

  // Create a input field for the current category name:
  new Setting(currentDiv).setName("Category name").addText((text) => {
    if (isEdit && obj.Contents != undefined) {
      text.setValue(obj.Contents[catNumber].Category);
    }
    text.onChange((value) => {
      if (obj.Contents != undefined) {
        obj.Contents[catNumber].Category = value;
      }
    });
  });

  // Automatically create the first entry field for this category:
  createEntryInput(isEdit, currentDiv, obj, catNumber, entryNumber++);
};
