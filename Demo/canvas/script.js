// DOM-элемент канваса
var canvas = document.getElementById('canvas');

// Контекст отрисовки
var ctx = canvas.getContext('2d');

var gradientL = ctx.createLinearGradient(0, 0, 90, 90);
gradientL.addColorStop(0, 'green');
gradientL.addColorStop(1, 'rgba(0, 255, 0, 0)');

ctx.fillStyle = gradientL;
ctx.fillRect(0, 0, 90, 90);

ctx.strokeStyle = 'blue';
ctx.strokeRect(10, 10, 70, 70);

ctx.fillStyle = 'blue';
ctx.fillRect(210, 0, 30, 30);

ctx.fillStyle = 'lightgreen';
ctx.fillRect(210, 40, 30, 30);

ctx.clearRect(0, 0, 300, 150);

ctx.fillStyle = 'black';
// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(80, 60);
// ctx.lineTo(110, 80);
// ctx.lineTo(125, 40);
// ctx.lineTo(140, 80);
// ctx.lineTo(170, 60);
// ctx.lineTo(150, 100);
// ctx.lineTo(150, 100);
// // ctx.bezierCurveTo(140, 90, 110, 90, 100, 100);
// ctx.closePath();
// ctx.stroke();
// ctx.fill();

ctx.strokeStyle = 'red';
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.stroke();

ctx.strokeStyle = 'black';
ctx.beginPath();
ctx.moveTo(150, 0);
ctx.lineTo(195, 130);
ctx.lineTo(80, 50);
ctx.lineTo(220, 50);
ctx.lineTo(105, 130);
ctx.lineTo(150, 0);
ctx.stroke();
ctx.fill('evenodd');

ctx.clearRect(0, 0, 300, 150);

ctx.font = '30px Tahoma';
ctx.textBaseline = 'hanging';
ctx.fillText('Hello from text', 0, 10);
ctx.fillText('in canvas', 0, 48);