const request = require('request');
const parseDependencies = require('./utils').parseDependencies;

request({
	url: `https://api.github.com/repos/troygibb/packageMap/contents/package.json`,
	method: 'GET',
	headers: {
		'User-Agent': 'troygibb'
	}
}, (err, response, body) => {
	if (err) throw err; 
	if (response.statusCode === 200) {
		console.log(parseDependencies(JSON.parse(body).content));
	} else {
		console.log(response.statusCode);
	}
});