// Реализация перетаскивания окна настроек персонажа

(function () {
    var dialogHandler = document.querySelector('.setup-user-pic + input');

    dialogHandler.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        // Запоминаем координаты начальной точки
        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var dragged = false;

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            dragged = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            document.querySelector('.setup').style.top = (document.querySelector('.setup').offsetTop - shift.y) + 'px';
            document.querySelector('.setup').style.left = (document.querySelector('.setup').offsetLeft - shift.x) + 'px';
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragged) {
                var onClickPreventDefault = function (evt) {
                    evt.preventDefault();
                    dialogHandler.removeEventListener('click', onClickPreventDefault);
                };

                dialogHandler.addEventListener('click', onClickPreventDefault);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();