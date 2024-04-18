module.exports.cl = async (variable, val) => {
	console.log('\x1b[36m%s\x1b[0m', variable + ":")
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
	console.log(val)
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
}

module.exports.getPagination = (page, size) => {

	const limit = size ? +size : 5;
	const offset = page ? page * limit : 0;

	this.cl("limit", limit)
	this.cl("page", page)


	return { limit, offset };
};
