export default class Node {

    #_element;
    left;
    top;
    width;
    height;

    #handles = [];

    constructor(width, height, left, top, handles, boardElement) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.#handles = handles;
        this.#CreateElement(boardElement);

        this.#StartEvent();
    }

    #CreateElement = (boardElement) => {
        this.#_element = document.createElement("div");
        this.#_element.classList.add('node');
        this.#_element.setAttribute('draggable', 'true');
        this.#_element.style.top = this.top + 'px';
        this.#_element.style.left = this.left + 'px';
        this.#_element.style.width = this.width + 'px';
        this.#_element.style.height = this.height + 'px';

        boardElement.append(this.#_element);

        this.#handles.forEach(handle => {
            handle.CreateElement(this);
        });
    }

    GetElement() {
        return this.#_element;
    }

    #SetPosition(left, top) {
        this.#_element.style.top = this.#_element.offsetTop - top + 'px';
        this.#_element.style.left = this.#_element.offsetLeft - left + 'px';
    }

    #StartEvent() {
        // events fired on the draggable target
        this.#_element.addEventListener("drag", (e) => {
            
            const newLeft = this.left - e.clientX;
            const newTop = this.top - e.clientY;

            this.left = e.clientX;
            this.top = e.clientY;

            this.#SetPosition(newLeft, newTop);
            
            this.#handles.forEach(handle => {
                handle.DragNodeCallback();
            });
            
        });

        this.#_element.addEventListener("dragstart", (e) => {

            event.dataTransfer.effectAllowed = "move";
            const emptyImage = new Image();
            // Set the src to be a 0x0 gif
            emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
            emptyImage.style.cursor = 'grab';
            e.dataTransfer.setDragImage(emptyImage, 0, 0);

            // Change the source element's background color
            // to show that drag has started
            e.currentTarget.classList.add("dragging");
            // Clear the drag data cache (for all formats/types)
            e.dataTransfer.clearData();
            // Set the drag's format and data.
            // Use the event target's id for the data
            e.dataTransfer.setData("text/plain", e.target.id);

            this.left = e.clientX;
            this.top = e.clientY;
        });

        this.#_element.addEventListener("dragend", (e) =>
            e.target.classList.remove("dragging")
        );
    }

    GetPosition () {

        const bound = this.#_element.getBoundingClientRect();

        const halfWidth = bound.width / 2;
        const halfHeight = bound.height / 2;

        return {
            left: this.#_element.offsetLeft + halfWidth,
            top: this.#_element.offsetTop + halfHeight
        }
    }

    FindHandle(name) {
        return this.#handles.find(h => h.name === name);;
    }

}