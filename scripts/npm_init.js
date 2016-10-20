const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');

const dependencyGraph = require('../server/parseRepo').dependencyGraph;

let count = 0;

const cleanDependencyObject = (dependencyObject) => {
	dependencyObject = dependencyObject.replace(/'/g, '"');
	dependencyObject = dependencyObject.replace(/(\b\w*)\:/g, '"$1":');
	let result;
	try {
		result = Object.keys(JSON.parse(dependencyObject));
	} 
	catch (err) {
		console.log('No dependencies')
		result = []; 
	}
	return result; 
};

//module.exports = (dependenciesArray) => {
	const dependenciesArray = ['request', 'body-parser'];
	shelljs.mkdir(`client_modules${count}`);
	shelljs.cd(`client_modules${count}`);
	shelljs.exec(`npm init -f`);
	dependenciesArray.forEach(dependency => {
		shelljs.exec(`npm i --save ${dependency}`);
		let newDependencies = cleanDependencyObject(shelljs.exec(`npm view ${dependency} dependencies`).stdout);
		dependencyGraph.set(dependency, newDependencies);
		while(newDependencies.length) {
			const innerDependency = newDependencies.pop();
			const innerDependencies = cleanDependencyObject(shelljs.exec(`npm view ${innerDependency} dependencies`).stdout);
			dependencyGraph.set(innerDependency, innerDependencies);
			innerDependencies.forEach((dependency) => {
				if (!dependencyGraph.get(innerDependencies)) {
					newDependencies.push()
				}
			});
		}
	});
	dependencyGraph.cleanRefs();
	shelljs.cd('..');
	shelljs.rm('-r', `client_modules${count}`);
	console.log('Modified dependency graph', dependencyGraph.storage);
	fs.writeFile(path.join(__dirname, 'exampleGraph.txt'), JSON.stringify(dependencyGraph.storage), (err) => {
		if (err) throw err;
		console.log('Wrote to file!');
	});
//};
