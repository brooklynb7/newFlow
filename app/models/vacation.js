'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment'),
	path = require('path'),
	config = require(path.resolve('./config/config'));


/**
 * Vacation Schema
 */
var VacationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: '请指定假期的归属者',
		unique: true
	},
	givenAnnual: {
		type: Number,
		default: 15
	},
	usedAnnual: {
		type: Number,
		default: 0
	},
	givenSick: {
		type: Number,
		default: 5
	},
	usedSick: {
		type: Number,
		default: 0
	}
});

mongoose.model('Vacation', VacationSchema);


/**
 * Vacation Request Schema
 */
var VacationRequestSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: '请指定请假人'
	},
	approver: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	type: {
		type: String,
		default: 'leave'
	},
	status: {
		type: Number,
		default: 0
	},
	updated: {
		type: Date
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Vacation', VacationSchema);

