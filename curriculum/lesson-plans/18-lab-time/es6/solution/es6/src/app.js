import {lineGraph} from './js/lineGraph';

var graph = new lineGraph(document.getElementsByTagName('canvas')[0], '/models/data.json');

graph.draw();

console.log(graph);
