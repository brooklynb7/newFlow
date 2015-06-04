(function($) {
	'use strict';

	var Service = function() {
		this.url_prefix = '/api';
	};

	/*
	 *	User Api
	 */
	Service.prototype.apiUrl = function(serviceUrl) {
		if (serviceUrl.indexOf('/') !== 0) {
			serviceUrl = '/' + serviceUrl;
		}
		return this.url_prefix + serviceUrl;
	};

	Service.prototype.signup = function(userObj) {
		return $.ajax({
			url: this.apiUrl('/auth/signup'),
			method: 'POST',
			data: userObj
		});
	};

	Service.prototype.signin = function(credentials) {
		return $.ajax({
			url: this.apiUrl('/auth/signin'),
			method: 'POST',
			data: {
				username: credentials.username,
				password: credentials.password
			}
		});
	};

	Service.prototype.getUserList = function(){
		return $.ajax({
			url: this.apiUrl('/users'),
			method: 'GET'
		});
	};

	Service.prototype.updateUserInfo = function(id, userInfo){
		return $.ajax({
			url: this.apiUrl('/users/' + id),
			method: 'PUT',
			data: userInfo
		});
	};

	Service.prototype.removeUser = function(id){
		return $.ajax({
			url: this.apiUrl('/users/' + id),
			method: 'DELETE'
		});
	};

	/*
	 *	Advice Api
	 */
	Service.prototype.postAdvice = function(adviceObj){
		return $.ajax({
			url: this.apiUrl('/advice'),
			method: 'POST',
			data: adviceObj
		});
	};

	Service.prototype.getAdviceList = function () {
		return $.ajax({
			url: this.apiUrl('/advice'),
			method: 'GET'
		});
	}

	window.Service = new Service();
})(jQuery);