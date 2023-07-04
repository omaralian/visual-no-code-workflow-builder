import Canvas from './canvas.js';
import Board from "./board.js";
import Handle from './handle.js';
import Edge from './edge.js';
import Node from './node.js';

// declare canvas object
const canvas = new Canvas();
// get canvas element
const canvasElement = canvas.GetElement();

// declare board object
const board = new Board(canvasElement);
// get board element
const boardElement = board.GetElement();

// set canvas scroll to center based on board size
// canvas.SetScrollToCenterOfBoard(boardElement);

const nodeA = new Node(200, 124, 50, 50, [
    new Handle("handleA", 200 - 16, 32)
], boardElement);
const nodeB = new Node(200, 124, 450, 300, [
    new Handle("handleB", 8, 32),
    new Handle("handleC", 8, 32 + 24)
], boardElement);

// declare edge object
const edge = new Edge(nodeA.FindHandle("handleA"), nodeB.FindHandle("handleB"), boardElement);
// declare edge object
const edge2 = new Edge(nodeA.FindHandle("handleA"), nodeB.FindHandle("handleC"), boardElement);

const nodeC = new Node(200, 124, 50, 600, [
    new Handle("handleD", 200 - 16, 32),
    new Handle("handleE", 200 - 16, 32 + 24)
], boardElement);

const nodeD = new Node(200, 124, 500, 700, [
    new Handle("handleD", 8, 32),
    new Handle("handleE", 8, 32 + 24)
], boardElement);

// declare edge object
const edge3 = new Edge(nodeC.FindHandle("handleD"), nodeD.FindHandle("handleD"), boardElement);
// declare edge object
const edge4 = new Edge(nodeC.FindHandle("handleE"), nodeD.FindHandle("handleE"), boardElement);