import CanvasMouseController from "./canvasMouseController.js";
import Board from "./board.js";

export default class Canvas {
    
    #_element;
    
    constructor () {
        this.#CreateElement();
        this.canvasMouseController = new CanvasMouseController(this.#_element);
    }

    #CreateElement() {
        this.#_element = document.createElement("div");
        this.#_element.setAttribute('id', 'canvas');
        document.body.prepend(this.#_element);
    }

    GetElement() {
        return this.#_element;
    }

    SetScrollToCenterOfBoard(boardElement) {
        const scrollLeft = boardElement.offsetWidth / 2 - this.#_element.offsetWidth / 2;
        const scrollTop = boardElement.offsetHeight / 2 - this.#_element.offsetHeight / 2;
        this.canvasMouseController.ScrollTo(scrollLeft, scrollTop);
    }

}