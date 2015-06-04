(function($) {
	'use strict';

	var selector = {
		userList: '.userList',
		userListTbody: '.userList tbody',
		updateUserForm: {
			nameInput: '.updateUserForm #inputName',
			mobileInput: '.updateUserForm #inputMobile',
			emailInput: '.updateUserForm #inputEmail'
		},
		modalMsg: '.modal-msg',
		modalContent: '.modal-content'
	};

	$(document).ready(function() {
		loadUserList();
	});

	function loadUserList() {
		var bi = new BusyIndicator($(selector.userList));
		bi.show();
		Service.getUserList().done(function(userList) {
			$.each(userList, function(idx, userItem) {
				$(selector.userListTbody).append(createUserTr(userItem));
			});
		}).fail(function(jqXHR) {
			console.log(jqXHR.responseText);
		}).always(function() {
			bi.hide();
		});
	}

	function createUserTr(userItem) {
		var $tr = $('<tr>').attr('id', userItem._id);
		$tr.append($('<td>').text(userItem.userId));
		$tr.append($('<td>').text(userItem.name));
		$tr.append($('<td>').text(userItem.mobile));
		$tr.append($('<td>').text(userItem.email));
		$tr.append($('<td class="text-center">')
			.append(createEditUserBtn(userItem)));
		return $tr;
	}

	function createEditUserBtn(userItem) {
		var $btn = $('<a href="javascript:void(0)" class="">编辑</a>');
		var $html = $(_.template($('#editFormTpl').html())(userItem));
		$btn.on('click', function() {
			UI.Modal.confirm({
				title: '编辑用户信息',
				html: $html,
				confirm: updateUserInfoFunction(userItem),
				suspendConfirm: true
			});
		});
		return $btn;
	}

	function updateUserInfoFunction(userItem) {
		return function($modal) {
			var bi = new BusyIndicator($modal.find(selector.modalContent));
			bi.show();
			Service.updateUserInfo(userItem._id, {
				name: $(selector.updateUserForm.nameInput).val(),
				mobile: $(selector.updateUserForm.mobileInput).val(),
				email: $(selector.updateUserForm.emailInput).val()
			}).done(function(user) {
				$modal.modal('hide');
				$(selector.userList).find('tr#' + userItem._id).replaceWith(createUserTr(user));
			}).fail(function(jqXHR) {
				$modal.find(selector.modalMsg).text(jqXHR.responseText);
			}).always(function() {
				bi.hide();
			});
		};
	}

})(jQuery);