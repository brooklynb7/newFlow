'use strict';

var path = require('path');
var express = require('express');
var pageRouter = express.Router();
var user = require(path.resolve('./app/controllers/users'));
var admin = require(path.resolve('./app/controllers/admin'));
var config = require(path.resolve('./config/config'));

module.exports = function(app) {
	pageRouter.get('/', admin.indexPage);
	pageRouter.get('/advice', admin.advicePage);
	pageRouter.get('/users', admin.userPage);
	app.use('/admin', user.requireLoginPage, user.requireRoleAccessPage(config.roles.admin), pageRouter);
};