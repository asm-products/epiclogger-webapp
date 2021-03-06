$ ->
	$('#sidebar .selectbox > p').on 'click', (e) ->
		select = $('#sidebar .selectbox');
		if select.hasClass 'open'
			select.removeClass 'open'
			select.addClass 'closed'
			select.find('.options').slideUp 80
		else
			select.removeClass 'closed'
			select.addClass 'open'
			select.find('.options').slideDown 80

	$('#sidebar ul li a').on 'click', (e) ->
		page = $(this).parent().attr('id').replace('menu_', '')
		loadPage page

	$(window).on 'resize', ->
		if $(window).width() <= 992
			$('#collapse_menu').removeClass 'in'
		else
			$('#collapse_menu').addClass 'in'

	$(window).trigger 'resize'

	loadPage 'errors'


window.loadPage = (pageName) ->
	console.log 'Loading page ' + pageName
	$('#maincontainer').html('').load('html/' + pageName + '.html');

window.setMenu = (menuItem) ->
	$('#sidebar li.active').removeClass 'active'
	$('#sidebar li#menu_' + menuItem).addClass 'active'