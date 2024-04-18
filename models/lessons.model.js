const { DataTypes } = require('sequelize');
const sequelize = require("../config/db")
const Lesson_teachers = require('./lesson_teachers.model')
const Teachers = require('./teachers.model')
const Lessons = sequelize.define(
	'Lessons',
	{

		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		title: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		tableName: 'lessons'
	}
);
Lessons.hasMany(Lesson_teachers)

module.exports = Lessons