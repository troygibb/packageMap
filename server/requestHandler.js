const fs = require('fs');

module.exports = (app) => {
	app.get('/graphDependencies', (req, res) => {
		res.send('We got you!')
	})
};