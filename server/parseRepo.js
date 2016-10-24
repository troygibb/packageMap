const request = require('request');
const parseDependencies = require('./utils').parseDependencies;

exports = module.exports = {};

exports.gitHubPackageRequest = (user, repo, callback) => {
	request({
		url: `https://api.github.com/repos/${user}/${repo}/contents/package.json`,
		method: 'GET',
		headers: {
			'User-Agent': 'troygibb'
		}
	}, (err, response, body) => {
		if (err) throw err; 
		if (response.statusCode === 200) {
			const dependenciesArray = parseDependencies(JSON.parse(body).content);
			callback(dependenciesArray);
		} else {
			console.log(response.statusCode);
		}
	});
};

// gitHubPackageRequest('troygibb', 'packageMap', 'package.json', (dependenciesArray) => {
// 	packageRecurse('root', dependenciesArray);
// });


