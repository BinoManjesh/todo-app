import { make, makeText } from "../tree-maker";

class NewThingButton {
  constructor(placeholder, className, onNewThing) {
    this.input = make("input", { placeholder: placeholder });
    this.input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        button.click();
      }
    });
    const button = makeText("button", "+");
    this.root = make("div", { class: className }, [this.input, button]);
    button.addEventListener("click", () => {
      const thing = this.input.value;
      if (thing != "") {
        onNewThing(thing);
        this.input.value = "";
      }
    });
  }
}

export default NewThingButton;
