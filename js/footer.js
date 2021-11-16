$(() => {
  var date = new Date();
  $("#footerdate").text(date.toLocaleDateString());
});
