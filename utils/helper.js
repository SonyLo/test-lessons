module.exports.cl = async (variable, val) => {
	console.log('\x1b[36m%s\x1b[0m', variable + ":")
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
	console.log(val)
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
}

module.exports.getPagination = (page, size) => {

	const limit = size ? size : 5;
	const offset = page ? (page - 1) * limit : 1;
	return { limit, offset };
};

module.exports.tryParseInt = (stringValue, defaultValue) => {
	if (!stringValue) return defaultValue;

	try {
		return parseInt(stringValue, 10);
	} catch (err) {
		return defaultValue;
	}
};