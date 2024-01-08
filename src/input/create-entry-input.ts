import { Setting } from "obsidian";
import { Database } from "src/main";

// This function is used when the "New entry" button is clicked:
export const createEntryInput = (
  isEdit: boolean,
  div: HTMLElement,
  obj: Database,
  catNumber: number,
  entryNumber: number
) => {
  /*
	No separate div is needed 
	since the new entry inputs are added to a parent category div.
	*/

  // Create new input:
  const displayedNum = entryNumber + 1;
  new Setting(div).setName("Entry #" + displayedNum).addText((text) => {
    if (isEdit && obj.Contents != undefined) {
      text.setValue(obj.Contents[catNumber].Entries[entryNumber]);
    }
    text.onChange((value) => {
      if (obj.Contents != undefined) {
        obj.Contents[catNumber].Entries[entryNumber] = value;
      }
    });
  });
};
