$(document).ready(function() {
  // Acción del botón para generar códigos QR
  $("#generateBtn").click(function() {
    generateQRCodes();
  });

  function generateQRCodes() {
    // Obtener los valores de los inputs
    var inputs = $(".qrInput");
    var qrCodesDiv = $("#qrCodes");

    // Limpiar div de códigos QR existentes
    qrCodesDiv.empty();

    // Validar que todos los campos tengan datos
    var allFieldsFilled = true;
    inputs.each(function() {
      if ($(this).val().trim() === '') {
        allFieldsFilled = false;
        return false; // Detener el bucle si se encuentra un campo vacío
      }
    });

    if (!allFieldsFilled) {
      alert('Todos los campos deben estar llenos para generar los códigos QR.');
      return;
    }

    // Generar códigos QR para cada input
    inputs.each(function() {
      var inputValue = $(this).val();
      var labelDescription = $(this).prev("label").text(); // Obtener el texto de la etiqueta label anterior
      var qrCodeDiv = $("<div class='qrCodeContainer'></div>"); // Use a container div for the QR code
      qrCodeDiv.qrcode({
        render: 'div',
        minVersion: 1,
        maxVersion: 40,
        ecLevel: 'L',
        size: 100,
        fill: '#fff',
        background: null,
        text: inputValue,
        radius: 0,
        quiet: 0,
        mode: 0,
        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,
        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',
        image: null
      });
      qrCodesDiv.append("<div class='card'><p class='description'>" + labelDescription + "</p>" + qrCodeDiv[0].outerHTML + "</div>");
    });

    // Agregar botón para generar PDF
    var pdfButton = $("<button></button>");
    pdfButton.text("Generar PDF");
    pdfButton.click(function() {
      generatePDF();
    });
    qrCodesDiv.append(pdfButton);
  }

  function generatePDF() {
    // Crear un nuevo documento PDF
    var doc = new jsPDF();

    // Obtener el contenido de los códigos QR en un canvas
    var qrCodeContainers = $(".qrCodeContainer");
    var numCodes = qrCodeContainers.length;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var qrCodeWidth = 120;
    var qrCodeHeight = 120;
    var canvasWidth = 2 * qrCodeWidth + 20; // Width of canvas to hold two QR codes side by side

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = Math.ceil(numCodes / 2) * qrCodeHeight + 20;

    var x = 10;
    var y = 10;

    // Draw each QR code on the canvas
    qrCodeContainers.each(function(index) {
      var qrCodeDiv = $(this)[0];
      html2canvas(qrCodeDiv, {
        canvas: canvas,
        x: x,
        y: y,
        width: qrCodeWidth,
        height: qrCodeHeight
      });

      // Move to the next position
      if (index % 2 === 0 && index > 0) {
        x = 10;
        y += qrCodeHeight + 10;
      } else {
        x += qrCodeWidth + 10;
      }
    });

    // Convert the canvas to image base64
    var imgData = canvas.toDataURL("image/png");

    // Add the image to the PDF document
    doc.addImage(imgData, "PNG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    // Save the PDF document
    doc.save('qrcodes.pdf');
  }
});