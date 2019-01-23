// Настройка сценария поведения пользователя в окне настроек волшебника 

(function(){
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var shop = document.querySelector('.setup-artifacts-shop');
  var shopItems = shop.querySelectorAll('img');
  var playerArtifacts = document.querySelector('.setup-artifacts');
  var artifactsCells = playerArtifacts.querySelectorAll('.setup-artifacts-cell');

  window.popupSetupWizard = {
    ESCKEYCODE : 27,
    ENTERKEYCODE : 13,
    setup : document.querySelector('.setup')
  };

  // Функция, которая закрывает окно настроек волшебника при нажатии Esc
  var onPopupEscPress = function(evt){
    if (evt.keyCode === window.popupSetupWizard.ESCKEYCODE){
      closePopup();
    };
  };

  // Функция, которая открывает окно настроек волшебника
  var openPopup = function(){
    window.popupSetupWizard.setup.classList.remove('hidden');
    document.addEventListener('keydown',
     onPopupEscPress);
  };

  // Функция, которая закрывает окно настроек волшебника
  var closePopup = function(){
    window.popupSetupWizard.setup.classList.add('hidden');
    window.popupSetupWizard.setup.style.left = '50%';
    window.popupSetupWizard.setup.style.top = '80px';
    document.removeEventListener('keydown',
     onPopupEscPress);
  };

  // Настройка отрытия/закрытия окна настроек волшебника
  setupOpen.addEventListener('click', function(){
    openPopup();
  });

  setupOpen.addEventListener('keydown', function(evt){
    if(evt.keyCode === window.popupSetupWizard.ENTERKEYCODE){
    openPopup();
    };
  });

  setupClose.addEventListener('click', function(){
    closePopup();
  });

  setupClose.addEventListener('keydown', function(evt){
    if(evt.keyCode === window.popupSetupWizard.ENTERKEYCODE){
    closePopup();
    };
  });

  setupUserName.addEventListener('focus', function(){
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserName.addEventListener('blur', function(){
    document.addEventListener('keydown', onPopupEscPress);
  });

  //Настройка сценария Drag'n'Drop артефактов
  var dragElement;

  var dragStart = function(e){
    dragElement = e.target;
    playerArtifacts.style.border = '2px dashed red';
  };

  var dragEnd = function(){
    playerArtifacts.style.border = 'none';
    dragElement = null;
  };

  var dragOver = function(evt){
    evt.preventDefault();
    this.style.backgroundColor = 'yellow';
  };;

  var dragLeave = function(){
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  };

  var dragDrop = function(e){
    var clone = dragElement.cloneNode(true);
    this.append(clone);
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    dragElement.setAttribute('draggable', 'false');
  };

  var addDraggableListeners = function(element){
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
  };

  for(var j = 0; j < shopItems.length; j++){
    addDraggableListeners(shopItems[j]);
  };

  addDragListeners = function(element){
    element.addEventListener('dragover', dragOver);
    element.addEventListener('dragleave', dragLeave);
    element.addEventListener('drop', dragDrop);
  };

  for(var i = 0; i < artifactsCells.length; i++){
    addDragListeners(artifactsCells[i])
  };

  var form = document.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function(evt){
    window.backend.save(new FormData(form), function(response){
      alert('Данные успешно отправлены');
      window.popupSetupWizard.setup.classList.add('hidden');
    }, function(string){
      alert(string);
    });
    evt.preventDefault();
  });

})();