
$('a[href="#speakers"]').live('click', function() {
  console.log('Speakers page clicked, loading content.');
});

$('#schedule').live('pagecreate', function() {
  $.get('data/events.xml', function(xml) {
    // If the content isn't loaded already go ahead and load it.
    if ($('section#schedule ul[data-role="listview"] li').length == 0) {
      $('section#schedule ul[data-role="listview"] li').remove();
      $(xml).find('day').each(function() {
     
        // Build the list-divider
        $('section#schedule ul[data-role="listview"]')
          .append(ich.list_divider_tmp({title: $(this).find('name:first').text()})).listview('refresh');
        
        // Now append each event to the list
        $(this).find('event').each(function() {
          var data = {
            id: $(this).find('id').text(),
            track: $(this).find('track').text(),
            name: $(this).find('name').text(),
            loc: $(this).find('location').text(),
            time: $(this).find('time').text()
          }
          $('section#schedule ul[data-role="listview"]')
            .append(ich.event_tmp(data)).listview('refresh');
        });
      });
    }
  });
});

$('.loadEvent').live('click', function() {
  var event_id = $(this).attr('id');
  $.get('data/events.xml', function(xml) {
    var e = $(xml).find('event id:contains("' + event_id + '")').parent('event');
    $('section#event section[data-role="content"] h2').html(e.find('name').text());
    $('section#event section[data-role="content"] p').html(e.find('desc').text());
  });
});

