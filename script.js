var inputEl = document.getElementById('qr-input');
var canvasEl = document.getElementById('qr-canvas');
var downloadBtn = document.getElementById('download-btn');
var printBtn = document.getElementById('print-btn');
var titleEl = document.getElementById('title'); 

function updateQRCode() {
  if (inputEl.value.trim() === '') {
    canvasEl.width = 0;
    titleEl.textContent = '';
    downloadBtn.disabled = true;
    printBtn.disabled = true;
  } else {
    var qr = new QRious({
      element: canvasEl,
      value: inputEl.value,
      size: 100,
      level: 'H',
      background: '#fff',
      foreground: '#333'
    });
    titleEl.textContent = inputEl.value;
    downloadBtn.disabled = false;
    printBtn.disabled = false;
  }
}

inputEl.addEventListener('input', updateQRCode);

downloadBtn.addEventListener('click', function() {
  var canvas = document.createElement('canvas');
  canvas.width = canvasEl.width;
  canvas.height = canvasEl.height + 20; // increased to accommodate the text
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText(inputEl.value, canvas.width/2, 15); // position the text above the QR code
  ctx.drawImage(canvasEl, 0, 20); // position the QR code below the text
  var link = document.createElement('a');
  link.download = inputEl.value + '.png';
  link.href = canvas.toDataURL();
  link.click();
});


printBtn.addEventListener('click', function() {
  var canvas = document.createElement('canvas');
  canvas.width = canvasEl.width;
  canvas.height = canvasEl.height + 20; // increased to accommodate the text
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(inputEl.value, canvas.width/2, 15); // position the text above the QR code
  ctx.drawImage(canvasEl, 0, 20) // position the QR code below the text
  var printWindow = window.open();
  printWindow.document.write('<div><img src="' + canvas.toDataURL() + '" onload="window.print()"></div>');
  printWindow.document.close();
});

updateQRCode();
