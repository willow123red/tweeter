$(document).ready(function () {
  console.log("I'm ready");

  $(`textarea`).on("input", function () {
    let maxLength = 140;
    let inputLength = this.value.length;

    let length = maxLength - inputLength;
    $(`.counter`).text(length);

    length > 0 ?
      $(`.counter`).css("color", "green") :
      $(`.counter`).css("color", "red");

    console.log(this.value.length);
  })
});