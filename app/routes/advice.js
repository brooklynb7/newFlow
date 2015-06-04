'use strict';

var express = require('express');
var path = require('path');
var apiRouter = express.Router();
var pageRouter = express.Router();
var user = require('../controllers/users');
var advice = require('../controllers/advice');
var config = require(path.resolve('./config/config'));

module.exports = function(app) {
	pageRouter.get('/', advice.indexPage);
	app.use('/advice', pageRouter);


	apiRouter.post('/', advice.doPost);
	apiRouter.get('/', user.requireLoginApi, user.requireRoleAccessApi(config.roles.admin), advice.getAdviceList);
	app.use('/api/advice', apiRouter);

};