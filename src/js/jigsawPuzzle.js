export default class JigsawPuzzle {

    #_element;

    constructor (boardElement) {
        this.#CreateElement(boardElement);
    }

    #CreateElement(boardElement) {
        this.#_element = document.createElement("div");
        this.#_element.setAttribute('id', 'jigsaw-puzzle');
        boardElement.prepend(this.#_element);
    }
}