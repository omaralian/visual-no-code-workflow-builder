// READ
// https://betterprogramming.pub/perfecting-drag-and-drop-in-pure-vanilla-javascript-a761184b797a
// https://blog.greggant.com/posts/2018/10/16/drawing-svg-edges-between-multiple-dom-objects.html

export default class Handle {

    name;
    #_element;
    left;
    top;
    
    node; // Remove Later

    edges = [];

    constructor(name, left, top) { 
        this.name = name;
        this.left = left;
        this.top = top;
    }

    CreateElement(node) {
        this.#_element = document.createElement("div");
        this.#_element.classList.add('handle');
        this.#_element.setAttribute('draggable', 'true');
        this.#_element.style.top = this.top + 'px';
        this.#_element.style.left = this.left + 'px';

        const nodeElement = node.GetElement();
        nodeElement.append(this.#_element);
    }

    #SetPosition(left, top) {
        this.#_element.style.top = this.#_element.offsetTop - top + 'px';
        this.#_element.style.left = this.#_element.offsetLeft - left + 'px';
    }

    GetPosition () {

        const bound = this.#_element.getBoundingClientRect();

        const parentEl = this.#_element.parentElement;
        
        const parentLeft = parentEl.offsetLeft;
        const parentTop = parentEl.offsetTop;

        const halfWidth = bound.width / 2;
        const halfHeight = bound.height / 2;

        return {
            left: this.#_element.offsetLeft + halfWidth + parentLeft,
            top: this.#_element.offsetTop + halfHeight + parentTop
        }
    }

    AddEdge(edge) {
        this.edges.push(edge);
    }

    DragNodeCallback() {
        this.edges.forEach(edge => {
            edge.SetPosition();
        });
    }

}