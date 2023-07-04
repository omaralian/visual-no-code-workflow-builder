export default class CanvasMouseController {
    
    #_canvasElement;
    
    #_mouseMoveX = 0;
    #_mouseMoveY = 0;

    #_mouseDownX = 0;
    #_mouseDownY = 0;

    // #_mouseStatus = 'mouseup';

    constructor (canvasElement) {
        this.#_canvasElement = canvasElement;
        this.#MouseMoveHandler.bind(this);
        this.#StartMouseUpEvent();
        this.#StartMouseDownEvent();

        this.#_canvasElement.addEventListener("dragover", (e) => {
            // prevent default to allow drop
            this.#_canvasElement.removeEventListener("mousemove", this.#MouseMoveHandler);
            e.preventDefault();
        });
    }

    #MouseMoveHandler = (e) => {
        this.#_mouseMoveX = e.clientX;
        this.#_mouseMoveY = e.clientY;

        const diffX = this.#_mouseDownX - this.#_mouseMoveX;
        const diffY = this.#_mouseDownY - this.#_mouseMoveY;
        this.#CalculateSwipe(diffX, diffY);
    }

    #StartMouseDownEvent() {
        this.#_canvasElement.addEventListener("mousedown", (e) => {
            this.#_mouseDownX = e.clientX;
            this.#_mouseDownY = e.clientY;
            this.#_canvasElement.addEventListener("mousemove", this.#MouseMoveHandler);
        });
    }

    #StartMouseUpEvent() {
        this.#_canvasElement.addEventListener("mouseup", (e) => {
            this.#_canvasElement.removeEventListener("mousemove", this.#MouseMoveHandler);
        });
    }

    #CalculateSwipe(diffX, diffY) {
        
        const currentScrollLeft = this.#_canvasElement.scrollLeft;
        const currentScrollTop = this.#_canvasElement.scrollTop;

        const newScrollLeft = currentScrollLeft + diffX;
        const newScrollTop = currentScrollTop + diffY;

        const amount = 0.02;

        const scrollLeft = this.#lerp(currentScrollLeft, newScrollLeft, amount);
        const scrollTop = this.#lerp(currentScrollTop, newScrollTop, amount);

        this.ScrollTo(scrollLeft, scrollTop);

    }

    #lerp = (start, end, amount) => {
        return (1 - amount) * start + amount * end;
    }

    ScrollTo(scrollLeft, scrollTop) {
        this.#_canvasElement.scroll({
            left: scrollLeft,
            top: scrollTop,
            behavior: "auto",
        });
    }
}