const fs = require('fs');
const path = require('path');

module.exports = (app) => {
	app.get('/graphDependencies', (req, res) => {
		console.log('Receing graphDependencies')
		fs.readFile(path.join(__dirname, '../scripts/exampleGraph.txt'), 'utf8', (err, data) => {
			if (err) throw err;
			res.send(JSON.stringify(data));
		})
	})
};