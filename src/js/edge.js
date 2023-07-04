export default class Edge {

    #_element;
    edgeElement;
    handleFrom;
    handleTo;

    constructor(handleFrom, handleTo, boardElement) {

        this.#CreateElement(boardElement);

        this.handleFrom = handleFrom;
        this.handleFrom.AddEdge(this);

        this.handleTo = handleTo;
        this.handleTo.AddEdge(this);

        this.SetPosition();
    }

    #CreateElement(boardElement) {
        this.#_element = document.createElementNS('http://www.w3.org/2000/svg','svg');
        this.#_element.setAttribute('version', '1.1');
        this.#_element.setAttribute('width', boardElement.offsetWidth);
        this.#_element.setAttribute('height', boardElement.offsetHeight);

        this.edgeElement = document.createElementNS('http://www.w3.org/2000/svg','path');
        this.#_element.append(this.edgeElement);

        this.edgeElement.style.position = 'absolute'
        this.edgeElement.setAttribute('stroke-width', '2');
        this.edgeElement.setAttribute('fill', 'transparent');
        this.edgeElement.setAttribute('stroke', '#000000');
        this.edgeElement.setAttribute('stroke-dasharray', '0 8 0');
        this.edgeElement.classList.add('edge');
        
        boardElement.append(this.#_element);
    }

    SetPosition = () => {
        
        const positionFrom = this.handleFrom.GetPosition();
        const positionTo = this.handleTo.GetPosition();

        const maxControlOffset = 512;
        const minControlOffset = 32;
        const controlOffset = Math.min(Math.max(Math.abs(positionTo.left - positionFrom.left), minControlOffset), maxControlOffset)

        const controlStart = {
            left: positionFrom.left + controlOffset,
            top: positionFrom.top
        };

        const controlEnd = {
            left: positionTo.left - controlOffset,
            top: positionTo.top
        };

        const d = `M ${positionFrom.left} ${positionFrom.top} C ${controlStart.left} ${controlStart.top}, ${controlEnd.left} ${controlEnd.top}, ${positionTo.left} ${positionTo.top}` ;

        this.edgeElement.setAttribute('d', d);
    }

    

}