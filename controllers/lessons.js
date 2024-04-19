const { Sequelize, Op } = require('sequelize');
const sequelize = require("../config/db")
const { Teachers, Lessons, Lesson_teachers, Lesson_students, Students } = require("../models/allModel")

const hr = require('../utils/helper')


module.exports.getLessons = async (req, res) => {

	let filterOptions = filter(req.body)
	// hr.cl("filter(req.body)", filter(req.body))

	const page = hr.tryParseInt(req.body.page, 1);
	const lessonsPerPage = hr.tryParseInt(req.body.lessonsPerPage, 5);
	const pagination = hr.getPagination(page, lessonsPerPage)


	if (typeof filterOptions == "string" && filterOptions.indexOf("Error") != -1) {
		return res.status(400).json(filterOptions)
	}
	// hr.cl("filterOptions", filterOptions)
	hr.cl("pagination", pagination)
	try {
		const lesson = await Lessons.findAll({
			limit: pagination.limit,
			offset: pagination.offset,
			where: filterOptions.options,
			include: [
				{
					model: Students,
					attributes: [
						'id',
						'name',
						[sequelize.literal('visit'), 'visit']
					],
					through: {
						model: Lesson_students,
						attributes: []
					}
				},
				{
					model: Teachers,
					attributes: [
						'id',
						'name'
					],

					where: filterOptions.tichersfilterOptions,
					through: {
						model: Lesson_teachers,
						attributes: []
					}
				}
			]
		});
		//хз как правильно, но очень интересно
		let countVisitTrue = null
		let strQuery = `SELECT COUNT(students.id) AS visitCount
  				FROM lessons
  				LEFT JOIN lesson_students ON lessons.id = lesson_students.lesson_id
  				LEFT JOIN students ON lesson_students.student_id = students.id
  				WHERE lessons.id = @idLessons AND lesson_students.visit = true;`

		for (let item of lesson) {
			let query = strQuery.replace('@idLessons', item.id)
			countVisitTrue = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
			item.dataValues.visitCount = countVisitTrue[0].visitcount
		}
		hr.cl("lesson.count", lesson.length)
		//хз как правильно, но очень интересно
		res.status(200).json(lesson)
	}
	catch (err) {
		res.status(400).json(err.message)
	}
}





function filter(filterOptions) {
	let { date, status, teacherIds, studentsCount, page, lessonsPerPage } = filterOptions

	let options = []
	if (date != "") {
		let dateResult = createFilterDate(date)
		if (typeof dateResult == "string" && dateResult.indexOf("Error") != -1) {
			return dateResult
		}
		options.push(dateResult)

	}


	if (status != "") {
		let statusResult = createFilterStatus(status)

		if (typeof statusResult == "string" && statusResult.indexOf("Error") != -1) {

			return statusResult
		}
		options.push(statusResult)

	}

	let tichersfilterOptions = []
	if (teacherIds != "") {
		tichersfilterOptions.push(createFilterTichers(teacherIds))

	}
	else {
		tichersfilterOptions = ""
	}



	return { options, tichersfilterOptions }

}


function createFilterDate(date) {
	let dataFilter = ""

	// hr.cl(date)
	let massDate = date.split(',')
	// hr.cl("massDate", massDate)
	if (massDate.length > 2) {
		// hr.cl(massDate)
		return "Error: many arg"
	}

	let i = 0

	for (i = 0; i < massDate.length; i++) {

		massDate[i] = massDate[i].trim()
		if (isValidDate(massDate[i]) == false) {
			return "Error: date is not valid"
		}
		if (massDate.length == 1) {
			dataFilter = {
				date: massDate[i]
			}
			return dataFilter
		}
		dataFilter = {
			date: {
				[Op.between]: [massDate[0], massDate[1]]
			}

		}

	}
	return dataFilter

}

function createFilterStatus(status) {
	let statusFilter = ""
	if (status != '1' && status != '0') {

		return "Error: bad arg status"
	}
	statusFilter = {
		status: status
	}
	return statusFilter
}

function createFilterTichers(teacherIds) {

	let arrIds = teacherIds.split(',')
	for (let item of arrIds) {
		item = item.trim()
	}
	let tichersIdsResult = {
		id: arrIds
	}
	// hr.cl("tichersIdsResult", tichersIdsResult)
	// hr.cl("tichersIdsResult", tichersIdsResult)
	return tichersIdsResult

}

function isValidDate(dateString) {

	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateString.match(regEx)) return false;  // Invalid format
	var d = new Date(dateString);

	var dNum = d.getTime();
	if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0, 10) === dateString;
}