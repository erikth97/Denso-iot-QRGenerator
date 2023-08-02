$(document).ready(function() {
 
  $("#generateBtn").on("click", function() {

    $("#qrCodes").empty();


    $(".qrInput").each(function(index) {

      const inputValue = $(this).val();

      if (inputValue.trim() !== '') {

        const qrContainerId = `qrCode_${index + 1}`;
        const qrContainer = $(`<div id="${qrContainerId}" class="qrCodeContainer"></div>`);
        $("#qrCodes").append(qrContainer);

        const qrcode = new QRCode(document.getElementById(qrContainerId), {
          text: inputValue,
          width: 128,
          height: 128,
        });
      }
    });
  });
});
