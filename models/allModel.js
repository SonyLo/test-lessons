

import sequelize from "../config/db.js"

import { DataTypes } from 'sequelize';




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
		timestamps: false
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
		timestamps: false
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
		timestamps: false
	}
);



Teachers.belongsToMany(Lessons, { through: Lesson_teachers, foreignKey: 'teacher_id' })
Lessons.belongsToMany(Teachers, { through: Lesson_teachers, foreignKey: 'lesson_id' })

Students.belongsToMany(Lessons, { through: Lesson_students, foreignKey: 'student_id' })
Lessons.belongsToMany(Students, { through: Lesson_students, foreignKey: 'lesson_id' })









export {
	Lesson_teachers,
	Lesson_students,
	Teachers,
	Lessons,
	Students
}

// export default { Lesson_teachers, Lesson_students }




