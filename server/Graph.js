module.exports = class Graph {
	constructor() {
		this.storage = [];
	}
	set(name, edges) {
		edges = edges.map(name => {
			const dependencyObject = this.get(name);
			if (dependencyObject) return dependencyObject; 
			return name; 
		});
		this.storage.push({
			name,
			edges
		})
	}
	get(name) {
		for (let i = 0; i < this.storage.length; i++) {
			if (this.storage[i].name === name) {
				return this.storage[i];
			}
		}
		return null; 
	}
	cleanRefs() {
		this.storage.forEach((dependency) => {
			dependency.edges = dependency.edges.map((edge) => {
				if (typeof edge === 'string') {
					return this.get(edge) || edge;
				}
				return edge; 
			});
		});
	}
}