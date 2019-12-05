
$("#scrapeButton").click(function() {
  $("#articles").empty();
  $.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<a href='" + data[i].url + "'>" + data[i].headline + "</a>" + "<button type='Button' id='saveButton' class='btn btn-outline-secondary btn-sm'>Save Article</button>" + "<br />" + data[i].summary + "</p>");
    }
  });
});




$("#clearButton").click(function() {
  $("#articles").empty();
});


