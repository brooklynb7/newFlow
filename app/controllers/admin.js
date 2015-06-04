'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	UserLogin = mongoose.model('UserLogin');

/* 
 * Page controllers
 */
exports.indexPage = function(req, res) {
	res.render('admin/index');
};

exports.advicePage = function (req, res) {
	res.render('admin/advice/list');
};

exports.userPage = function(req, res){
	res.render('admin/users/list');
};