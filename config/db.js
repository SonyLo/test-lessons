const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('test', 'user_lessons', '5ScxzLM0CDmL96Z', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
	// logging: true,
	timezone: '+03:00'
});

module.exports = sequelize;                                                 