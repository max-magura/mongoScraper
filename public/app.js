
$("#scrapeButton").click(function() {
  $("#articles").empty();
  $.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<a href='" + data[i].url + "'>" + data[i].headline + "</a>" + "<button type='Button' id='saveButton' class='btn btn-outline-secondary btn-sm' data-id='" + data[i]._id + "'>Save Article</button>" + "<br />" + data[i].summary + "</p>");
    }
  });
});

$("#clearButton").click(function() {
  $("#articles").empty();
});

$(document).on("click", "#savedArticlesPage", function() {
  $.ajax({
    method: "GET",
    url: "/savedArticles",
  })
});


// $(document).on("click", "#saveButton", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "PUT",
//     url: "/articles/" + thisId
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });
// });