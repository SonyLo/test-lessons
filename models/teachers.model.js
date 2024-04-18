const { DataTypes } = require('sequelize');
const sequelize = require("../config/db")
const Lesson_teachers = require('./lesson_teachers.model')
const Lessons = require("./lessons.model")
const Teachers = sequelize.define(
	'Teachers',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	},
	{
		timestamps: false,
		tableName: 'teachers'
	}
);

// Teachers.belongsToMany(Lessons, { through: Lesson_teachers })
// Teachers.belongsToMany(Lessons, { through: Lesson_teachers })
Teachers.hasMany(Lesson_teachers)
module.exports = Teachers

