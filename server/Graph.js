module.exports = class Graph {
	constructor() {
		this.storage = [];
	}
	set(name, edges) {
		const newDependency = { name, edges };
		this.storage.push(newDependency);
		return newDependency;
	}
	get(name) {
		for (let i = 0; i < this.storage.length; i++) {
			if (this.storage[i].name === name) {
				return this.storage[i];
			}
		}
		return null; 
	}
}