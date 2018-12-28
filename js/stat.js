var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var MAX_GISTO_HEIGHT = 150;
var WIDTH_COLUMN = 40;
var WIDTH_BETWEEN_COLUMN = 50;
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var PLAYER_TEXT_COORDINATEY = 260;
var playerColumnCoordinateX = 150;
var PLAYER_COLUMN_COORDINATEY = 90;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr){
  var maxElement = arr[0];

  for(var i = 0; i < arr.length; i++){
    if(arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement
};

var renderColumnColor = function(){
  var randomOpacity = 0;
  while(randomOpacity <= 0.1){
    randomOpacity = Math.floor(Math.random() * 10) / 10;
  }
  return 'rgba(0, 0, 255, ' + randomOpacity +')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'handing';
  ctx.fillText('Ура вы победили!', 150, 30);
  ctx.fillText('Список результатов:',  150, 50);

  for(var i = 0; i < names.length; i++){
    var gistoHeight = (MAX_GISTO_HEIGHT * times[i]) / getMaxElement(times);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], playerColumnCoordinateX, PLAYER_TEXT_COORDINATEY);

    if(names[i] === 'Вы'){
      ctx.fillStyle = PLAYER_COLUMN_COLOR;
    } else {
      ctx.fillStyle = renderColumnColor();
    }
    var playerColumnCoordinateY = PLAYER_COLUMN_COORDINATEY + (MAX_GISTO_HEIGHT - gistoHeight);

    ctx.fillRect(playerColumnCoordinateX , playerColumnCoordinateY, WIDTH_COLUMN, gistoHeight);
    playerColumnCoordinateX += WIDTH_BETWEEN_COLUMN
    
  }
};