(function() {
  $(function() {
    $('#sidebar .selectbox > p').on('click', function(e) {
      var select;
      select = $('#sidebar .selectbox');
      if (select.hasClass('open')) {
        select.removeClass('open');
        select.addClass('closed');
        return select.find('.options').slideUp(80);
      } else {
        select.removeClass('closed');
        select.addClass('open');
        return select.find('.options').slideDown(80);
      }
    });
    $('#sidebar ul li a').on('click', function(e) {
      var page;
      page = $(this).parent().attr('id').replace('menu_', '');
      return loadPage(page);
    });
    $(window).on('resize', function() {
      if ($(window).width() <= 992) {
        return $('#collapse_menu').removeClass('in');
      } else {
        return $('#collapse_menu').addClass('in');
      }
    });
    $(window).trigger('resize');
    return loadPage('account');
  });

  window.loadPage = function(pageName) {
    console.log('Loading page ' + pageName);
    return $('#maincontainer').html('').load('html/' + pageName + '.html');
  };

  window.setMenu = function(menuItem) {
    $('#sidebar li.active').removeClass('active');
    return $('#sidebar li#menu_' + menuItem).addClass('active');
  };

}).call(this);
