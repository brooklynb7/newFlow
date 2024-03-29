'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	async = require('async'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	path = require('path'),
	util = require(path.resolve('./app/utils')),
	errorHandler = require('./errors'),
	request = require('request'),
	config = require(path.resolve('./config/config')),
	User = mongoose.model('User'),
	UserLogin = mongoose.model('UserLogin');

/* 
 * Page controllers
 */

exports.signupPage = function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		res.render('users/signup');
	}
};

exports.signinPage = function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		res.render('users/signin');
	}
};

exports.signoutPage = function(req, res) {
	req.logout();
	req.session.user = null;
	res.redirect('/');
};

exports.listPage = function(req, res) {
	res.render('users/list');
};

exports.profilePage = function(req, res) {
	res.render('users/profile', {
		user: req.session.user
	});
};

/* Reuqire login page middleware */
exports.requireLoginPage = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).render('errors/401');
	}
	next();
};

exports.requireRoleAccessPage = function(roles) {
	return function(req, res, next) {
		if (_.isString(roles)) {
			roles = [roles];
		}
		if (!_.isArray(roles)) {
			return next('角色参数错误');
		}
		if (_.includes(roles, req.session.user.role)) {
			next();
		} else {
			return res.status(403).render('errors/403');
		}
	};
};

/*
 * API controllers
 */

var doLogin = function(user, req, res) {
	// Remove sensitive data before login
	user.password = undefined;
	user.salt = undefined;

	req.login(user, function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			var ip = util.getRealIP(req.ip);

			var userLogin = new UserLogin({
				user: user,
				ip: ip
			});

			if (ip === '127.0.0.1') {
				userLogin.address = '本地测试';
				userLogin.save();
			} else {
				var requestOption = {
					uri: 'http://api.map.baidu.com/location/ip?ak=' + config.baiduMapKey + '&ip=202.198.16.3&coor=bd09ll',
					method: 'GET'
				};
				request(requestOption, function(err, response, body) {
					if (!err && response.statusCode === 200) {
						var rst = JSON.parse(body);
						if (rst.status === 0) {
							userLogin.address = rst.content.address;
							userLogin.save();
						}
					}
				});
			}

			req.session.user = user;
			res.json(user);
		}
	});
};

exports.signup = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);

	// Add missing user fields
	user.provider = 'local';

	if(!user.email){
		user.email = user.username + '@test.com';
	}

	// Then save the user 
	user.save(function(err) {
		if (err) {
			return res.status(400).send(errorHandler.getErrorMessage(err));
		} else {
			doLogin(user, req, res);
		}
	});
};

exports.signin = function(req, res, next) {
	passport.authenticate('local', {
			badRequestMessage: '请输入用户名和密码'
		},
		function(err, user, info) {
			if (err || !user) {
				res.status(400).send(info);
			} else {
				doLogin(user, req, res);
			}
		})(req, res, next);
};

exports.getUserList = function(req, res) {
	User.find().sort('userId').select('_id userId username roles boss mobile name email level')
		.exec(function(err, users) {
			if (err) return res.status(400).send(errorHandler.getErrorMessage(err));
			res.json(users);
		});
};

exports.updateUserInfo = function(req, res) {
	var user = req.userProfile;
	user.name = req.body.name;
	user.email = req.body.email;
	user.mobile = req.body.mobile;
	user.updated = Date.now();
	user.updatedBy = req.user;

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			user.password = undefined;
			user.salt = undefined;
			res.jsonp(user);
		}
	});
};

exports.removeUser = function(req, res) {
	var user = req.userProfile;
	user.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(user);
		}
	});
};


/* Require login API middleware */
exports.requireLoginApi = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).json({
			message: '请先登录'
		});
	}

	next();
};


exports.requireRoleAccessApi = function(roles) {
	return function(req, res, next) {
		if (_.isString(roles)) {
			roles = [roles];
		}
		if (!_.isArray(roles)) {
			return next('角色参数错误');
		}
		if (_.includes(roles, req.session.user.role)) {
			next();
		} else {
			return res.status(403).json({
				message: '未授权'
			});
		}
	};
};

/* User id api middleware */
exports.userByIdApi = function(req, res, next, id) {
	User.findById(id).exec(function(err, user) {
		if (err) return res.json(err);
		if (!user) return res.status(400).json({
			message: '未找到该用户'
		});
		req.userProfile = user;
		next();
	});
};