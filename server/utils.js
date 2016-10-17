exports = module.exports = {};

const decodeBase64 = (base64String) => {
	return new Buffer(base64String, 'base64').toString()
};

const createDependenciesArray = (dependencyObject) => {
	return Object.keys(dependencyObject).map(dep => dep);
};

exports.parseDependencies = (base64String) => {
	const decodedPackage = JSON.parse(decodeBase64(base64String));
	const fullPackage = Object.assign({}, decodedPackage.dependencies, decodedPackage.devDependencies);
	return createDependenciesArray(fullPackage);
};


