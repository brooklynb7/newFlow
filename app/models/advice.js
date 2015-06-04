'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

/**
 * Data Schema
 */
var AdviceSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		required: '请填写您的邮箱, 以便我们与您联系',
		default: ''
	},
	phone: {
		type: String,
		trim: true,
		default: ''
	},
	advice: {
		type: String,
		trim: true,
		required: '请填写您的意见'
	},
	category: {
		type: Number
	},
	status: {
		type: Number,
		default: 1
	},
	leaveMsg: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updateBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	updateAt: {
		type: Date
	}
});

mongoose.model('Advice', AdviceSchema);

