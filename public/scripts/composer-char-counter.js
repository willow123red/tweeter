$(document).ready(function () {
  console.log("I'm ready");

  $(`textarea`).keyup(function () {
    let maxLength = 140;
    let inputLength = this.value.length;

    length = maxLength - inputLength;
    $(`.counter`).text(length);

    length > 0 ?
      $(`.counter`).css("color", "blue") :
      $(`.counter`).css("color", "red");

    console.log(this.value.length);
  })
});