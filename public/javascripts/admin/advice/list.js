(function($) {
	'use strict';

	var selector = {
		adviceList: '.adviceList'
	};

	$(document).ready(function() {
		loadAdviceList();
	});

	function loadAdviceList () {
		var bi = new BusyIndicator($(selector.adviceList));
		bi.show();
		Service.getAdviceList().done(function(adviceList) {
			$.each(adviceList, function(idx, adviceItem) {
				$(selector.adviceList).append(createAdviceItem(adviceItem));
				$(selector.adviceList).append($('<div class="list-group-separator" />'));
			});
		}).fail(function(jqXHR) {
			console.log(jqXHR.responseText);
		}).always(function() {
			bi.hide();
		});
	}

	function createAdviceItem (adviceItem) {
		var $groupItem = $('<div class="list-group-item" />');
		
		var $rowIcon = $('<div class="row-action-primary" />');
		var $icon = $('<i class="mdi-file-folder" />');
		$rowIcon.append($icon);

		var $rowContent = $('<div class="row-content" />');
		var $dateContent = $('<div class="least-content" />').html(moment(adviceItem.created).fromNow());
		var title = adviceItem.name?  (adviceItem.name + '('+ adviceItem.email + ')') : adviceItem.email;
		var $title = $('<h4 class="list-group-item-heading" />').html(title);
		var $content = $('<p class="list-group-item-text" />').html(adviceItem.advice);
		$rowContent.append($dateContent).append($title).append($content);

		$groupItem.append($rowIcon).append($rowContent);
		
		return $groupItem;
	}


})(jQuery);

// div.list-group-item
// 	div.row-action-primary
// 		i.mdi-file-folder
// 	div.row-content
// 		div.least-content 15m
// 		h4.list-group-item-heading Tile with a label
// 		p.list-group-item-text Donec id elit non mi porta gravida at eget metus.
//div.list-group-separator