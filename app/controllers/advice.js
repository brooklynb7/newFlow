'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	mongoose = require('mongoose'),
	path = require('path'),
	errorHandler = require('./errors'),
	User = mongoose.model('User'),
	Advice = mongoose.model('Advice');

/* 
 * Page controllers
 */

exports.indexPage = function(req, res) {
	res.render('advice/index');
};

/*
 * API controllers
 */

exports.doPost = function(req, res) {
	var advice = new Advice({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		category: parseInt(req.body.category),
		advice: req.body.advice
	});
	if (req.session.user) {
		advice.user = req.session.user;
	}

	advice.save(function(err) {
		if (err) {
			return res.status(400).send(errorHandler.getErrorMessage(err));
		} else {
			res.json({
				code: 200,
				msg: 'ok'
			});
		}
	});
};

exports.getAdviceList = function (req, res) {
	Advice.find().sort('-created')
		.exec(function(err, advice) {
			if (err) return res.status(400).send(errorHandler.getErrorMessage(err));
			res.json(advice);
		});
}