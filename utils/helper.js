module.exports.cl = async (variable, val) => {
	console.log('\x1b[36m%s\x1b[0m', variable + ":")
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
	console.log(val)
	console.log('\x1b[36m%s\x1b[0m', "---------------------")
}

