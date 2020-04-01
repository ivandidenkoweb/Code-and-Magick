var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 16;
var COLOM_GAP = 50;
var COLOM_WIDTH = 40;
var COLOM_HEIGHT = 150; 
var mainPlayerColor = 'rgba(255, 0, 0, 1)';

var getBlueColor = function () {
  return 'rgba(0, 0, 255, 0.' + Math.ceil(Math.random() * 10) + ')';
};

var renderCloud = function(ctx, x , y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }

    return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000'; 

    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + COLOM_GAP, CLOUD_Y + GAP + FONT_HEIGHT);
    ctx.fillText('Список результатов:', CLOUD_X + COLOM_GAP, CLOUD_Y + GAP + FONT_HEIGHT * 2);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
        ctx.fillStyle = '#000';

        ctx.fillText(names[i], CLOUD_X + COLOM_GAP + (COLOM_WIDTH + COLOM_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);

        if (names[i] == 'Вы') {
            ctx.fillStyle = mainPlayerColor;
        } else {
            ctx.fillStyle = getBlueColor();
        }

        ctx.fillRect(CLOUD_X + COLOM_GAP + (COLOM_WIDTH + COLOM_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_HEIGHT - (COLOM_HEIGHT * times[i]) / maxTime, COLOM_WIDTH, (COLOM_HEIGHT * times[i]) / maxTime);    
        
        ctx.fillStyle = '#000';

        ctx.fillText(Math.floor(times[i]), CLOUD_X + COLOM_GAP + (COLOM_WIDTH + COLOM_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_HEIGHT - (COLOM_HEIGHT * times[i]) / maxTime - GAP);
    }
};