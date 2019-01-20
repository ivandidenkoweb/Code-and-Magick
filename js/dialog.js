// Настройка сценария поведения пользователя окна настроек волшебника 

(function(){
  var dialogHandler = document.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function(moveEvt){
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

      window.popupSetupWizard.setup.style.top = (window.popupSetupWizard.setup.offsetTop - shift.y) + 'px';
      window.popupSetupWizard.setup.style.left = (window.popupSetupWizard.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function(upEvt){
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if(dragged){
        var onClickPreventDefault = function(evt){
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();