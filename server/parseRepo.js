const request = require('request');
const parseDependencies = require('./utils').parseDependencies;
const Graph = require('./Graph');

exports = module.exports = {};

exports.dependencyGraph = new Graph();

// const packageRecurse = (currentName, dependencyArray) => {
// 	exports.dependencyGraph.set(currentName, dependencyArray);
// 	dependencyArray.forEach(dependency => {
// 		gitHubPackageRequest('troygibb', 'packageMap', 'node_modules')
// 	});
// }

// const gitHubPackageRequest = (user, repo, path, callback) => {
// 	request({
// 		url: `https://api.github.com/repos/${user}/${repo}/contents/${path}`,
// 		method: 'GET',
// 		headers: {
// 			'User-Agent': 'troygibb'
// 		}
// 	}, (err, response, body) => {
// 		if (err) throw err; 
// 		if (response.statusCode === 200) {
// 			const dependenciesArray = parseDependencies(JSON.parse(body).content);
// 			callback(dependenciesArray);
// 		} else {
// 			console.log(response.statusCode);
// 		}
// 	});
// };

// gitHubPackageRequest('troygibb', 'packageMap', 'package.json', (dependenciesArray) => {
// 	packageRecurse('root', dependenciesArray);
// });


