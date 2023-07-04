export default class Board {

    #_element;

    constructor (canvasElement) {
        this.#CreateElement(canvasElement);
        this.#StartEvent();
    }

    #CreateElement(canvasElement) {
        this.#_element = document.createElement("div");
        this.#_element.setAttribute('id', 'board');
        canvasElement.prepend(this.#_element);
    }

    GetElement() {
        return this.#_element;
    }

    #StartEvent() {
        // events fired on the drop targets
        this.#_element.addEventListener("dragover", (e) => {
            // prevent default to allow drop
            // e.preventDefault();
        });
    }

}