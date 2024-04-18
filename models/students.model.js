const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Students = sequelize.define(
	'Students',
	{

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}
	,
	{
		timestamps: false,
		tableName: 'students'
	}
);

module.exports = Students
