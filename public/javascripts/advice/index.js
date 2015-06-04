(function($) {
	'use strict';

	var selector = {
		nameInput: '#inputName',
		emailInput: '#inputEmail',
		phoneInput: '#inputPhone',
		categorySelect: '#selectCategory',
		adviceInput: '#inputAdvice',
		postAdviceBtn : '#postAdviceBtn',
		adviceMsg: '.adviceMsg'
	};

	$(document).ready(function() {
		bindPostAdviceEvent();
	});

	function bindPostAdviceEvent () {
		$(selector.postAdviceBtn).on('click', function () {
			var $adviceMsg = $(selector.adviceMsg);
			var adviceVal = $(selector.adviceInput).val();
			$adviceMsg.empty();
			if(!adviceVal){
				UI.showErrorText($adviceMsg, '请填写您的意见，谢谢');
				return;
			} else {
				var bi = new BusyIndicator($(this));
				bi.show();
				Service.postAdvice({
					name: $(selector.nameInput).val(),
					email: $(selector.emailInput).val(),
					phone: $(selector.phoneInput).val(),
					category: $(selector.categorySelect).val(),
					advice: adviceVal,
				}).done(function () {
					UI.showSuccessText($adviceMsg,'感谢您提出的宝贵意见');
					resetAdviceForm();
				}).fail(function (jqXHR) {
					UI.showErrorText($adviceMsg, jqXHR.responseText);
				}).always(function () {
					bi.hide();
				});
			}
		});
	}

	function resetAdviceForm() {
		$(selector.categorySelect).val('1');
		$(selector.adviceInput).val('');
	}

})(jQuery);