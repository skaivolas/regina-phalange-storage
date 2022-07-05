$(document).ready(function() {
  $('#header .nav li.active a').tooltip({trigger: 'manual'}).tooltip('show');
  $('#logo-ircam').tooltip();

  $('#header .nav li:not(.active) a')
    .tooltip({trigger: 'manual'})
    .mouseover(function() {
      $('#header .nav li.active a').tooltip('hide');
      $(this).tooltip('show');
    })
    .mouseout(function() {
      $(this).tooltip('hide');
      $('#header .nav li.active a').tooltip('show');
    });
});
