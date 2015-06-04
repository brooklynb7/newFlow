'use strict';


module.exports = function(app) {
	app.use('/admin', function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(err.status || 500).render('admin/errors/500', {
			message: err.message,
			error: err
		});
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(err.status || 500).render('errors/500', {
			message: err.message,
			error: err
		});
	});

	app.use('/admin', function(req, res) {
		res.status(404).render('admin/errors/404');
	});


	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('errors/404');
	});
};