const request = require('request');
const cheerio = require('cheerio');

const path = require('path');
const fs = require('fs');

const Graph = require('../server/Graph');
const gitHubPackageRequest = require('../server/parseRepo').gitHubPackageRequest;

const graph = new Graph();

exports = module.exports = {};

const scrapeDependencies = (packageName, callback) => {
	let dependencies = [];
	requestPackage(packageName, (html) => {
		let $ = cheerio.load(html);
		$('.sidebar').find('h3').each((i, elem) => {
			const text = $(elem).text();
			if (/Dependencies/.test(text)) {
				const parentParagraph = $(elem).next();
				parentParagraph.children().each((i, innerElem) => {
					dependencies.push($(innerElem).text());
				});
			}
		});
		callback(dependencies);
	});
}

const requestPackage = (packageName, callback) => {
	request(`https://www.npmjs.com/package/${packageName}`, (err, response, body) => {
		if (err) throw err; 
		if (response.statusCode === 200) {
			callback(body)
		}
	});
}

populateGraph = (user, repo, callback) => {
	gitHubPackageRequest(user, repo, (dependencies) => {
		graph.set('root', dependencies);
		let dependencyArr = dependencies.slice();
		const sub = (cb) => {
			if (!dependencyArr.length) {
				console.log('In base case!')
				cb(graph);
				return;
			}
			let newDependency = dependencyArr.pop();
			console.log('new dependency ', newDependency);
			console.log('depedency Arr is now... ', dependencyArr.length);
			if (!graph.get(newDependency)) {
				scrapeDependencies(newDependency, (newDependencies) => {
					graph.set(newDependency, newDependencies);
					dependencyArr = [...dependencyArr, ...newDependencies];
					sub(cb);
				});
			} else {
				sub(cb);
			}
		}
		sub(callback);
	});
}

populateGraph('troygibb', 'packageMap', (dependencyGraph) => {
	console.log('new storage! ', dependencyGraph.storage);
	fs.writeFile(path.join(__dirname, 'exampleGraph.txt'), JSON.stringify(dependencyGraph.storage), (err) => {
		if (err) throw err;
		console.log('Wrote to file!');
	});
});