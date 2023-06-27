$("#add_user").submit(function (event) {
  alert("Whisper posted! :0 Go back to homepage to see all whispers!");
});

$("#update_user").submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `https://whispergallery.onrender.com/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert(
      "Re-Whispered successfully! Go back to homepage to see all Whispers!"
    );
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `https://whispergallery.onrender.com/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Are you sure bud?")) {
      $.ajax(request).done(function (response) {
        alert(
          "Hmm! Your whisper was deleted! :/ I was in the mood for some Gossip tho!"
        );
        location.reload();
      });
    }
  });
}
