import ClientGraph from './ClientGraph';

export function mapDependencies(previousState, action) {
	const { data } = action;
	const clientGraph = new ClientGraph(data);
	clientGraph.forEachStorage((dependency) => {
		dependency.edges = dependency.edges.map(edge => clientGraph.get(edge) || clientGraph.set(edge, []));
	});
	clientGraph.forEachStorage((dependency) => {
		const xCoord = randomNum(previousState.width)
		const yCoord = randomNum(previousState.height)
		dependency.coords = [xCoord, yCoord];
	});
	return Object.assign({}, previousState, { 
		dependencies: clientGraph.storage
	});
}

function randomNum(range) {
	return Math.floor(Math.random() * range);
}