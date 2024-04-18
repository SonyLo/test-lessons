

const sequelize = require("../config/db")

const { Sequelize, DataTypes } = require('sequelize');

const Lesson_teachers = sequelize.define('lesson_teacher', {}, {
	timestamps: false
})

const Lesson_students = sequelize.define(
	'lesson_student',
	{
		visit: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
	timestamps: false
})

const Teachers = sequelize.define(
	'teacher',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	},
	{
		timestamps: false,
		// tableName: 'teachers'
	}
);

const Students = sequelize.define(
	'student',
	{

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}
	,
	{
		timestamps: false,
		// tableName: 'students'
	}
);



const Lessons = sequelize.define(
	'lesson',
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
		// tableName: 'lessons'
	}
);



Teachers.belongsToMany(Lessons, { through: Lesson_teachers, foreignKey: 'teacher_id' })
Lessons.belongsToMany(Teachers, { through: Lesson_teachers, foreignKey: 'lesson_id' })

Students.belongsToMany(Lessons, { through: Lesson_students, foreignKey: 'student_id' })
Lessons.belongsToMany(Students, { through: Lesson_students, foreignKey: 'lesson_id' })




// Lessons.hasMany(Lesson_teachers, { foreignKey: 'lesson_id' });
// Lesson_teachers.belongsTo(Lessons, { foreignKey: 'lesson_id' });

// Teachers.hasMany(Lesson_teachers, { foreignKey: 'teacher_id' });
// Lesson_teachers.belongsTo(Teachers, { foreignKey: 'teacher_id' });

// Lesson_teachers.removeAttribute("id")

// Students.hasMany(Lesson_students, { foreignKey: 'student_id' })
// Lesson_students.belongsTo(Students, { foreignKey: 'student_id' })


module.exports = {
	Lesson_teachers,
	Lesson_students,
	Teachers,
	Lessons,
	Students
}


