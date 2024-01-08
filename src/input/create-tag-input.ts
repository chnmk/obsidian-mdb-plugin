import { Setting } from "obsidian";
import { Database } from "src/main";

// This function is used when the "New tag" button is clicked:
export const createTagInput = (
  isEdit: boolean,
  div: HTMLElement,
  obj: Database,
  tagNumber: number
) => {
  // Create a separate div for the new input:
  const currentDiv = div.createDiv("tag-" + tagNumber);

  // Create new input:
  const displayedNum = tagNumber + 1;
  new Setting(currentDiv).setName("Tag #" + displayedNum).addText((text) => {
    if (isEdit && obj.Tags != undefined) {
      text.setValue(obj.Tags[tagNumber]);
    }
    text.onChange((value) => {
      if (obj.Tags != undefined) {
        obj.Tags[tagNumber] = value;
      }
    });
  });
};
