(function($) {
	'use strict';

	var BusyIndicator = function(element) {
		this.element = element;
		this.isVisible = false;
	};
	BusyIndicator.prototype.show = function() {
		if (this.element) {
			this.element.block({
				message: '<img src="/static/images/loading.gif" style="height:16px;" />',
				css: {
					backgroundColor: 'transparent',
					border: '0px'
				},
				overlayCSS: {
					backgroundColor: '#EEE',
					opacity: 0.5
				},
				baseZ: 10000,
				centerY: true
			});
			this.isVisible = true;
		}
		return this;
	};

	BusyIndicator.prototype.hide = function() {
		if (this.element) {
			this.element.unblock();
		}
		this.isVisible = false;
		return this;
	};

	window.BusyIndicator = BusyIndicator;
})(jQuery);