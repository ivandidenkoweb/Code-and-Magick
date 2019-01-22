// Настройка сценария поведения пользователя в окне настроек волшебника 

(function(){
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var mainWizardCoat = document.querySelector('.wizard-coat');
  var mainWizardEyes = document.querySelector('.wizard-eyes');
  var mainFireballWrap = document.querySelector('.setup-fireball-wrap');
  var shop = document.querySelector('.setup-artifacts-shop');
  var shopItems = shop.querySelectorAll('img');
  var playerArtifacts = document.querySelector('.setup-artifacts');
  var artifactsCells = playerArtifacts.querySelectorAll('.setup-artifacts-cell');
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  // Изменение цвета мантии, глаз, фаерболла по нажатию мышки на случайный
  mainWizardCoat.addEventListener('click', function(){
    mainWizardCoat.style.fill = coatColors[window.getRandomNumber(coatColors.length)];
  });

  mainWizardEyes.addEventListener('click', function(){
    mainWizardEyes.style.fill = eyesColors[window.getRandomNumber(eyesColors.length)];
  });

  mainFireballWrap.addEventListener('click', function(){
    mainFireballWrap.style.backgroundColor = fireballColors[window.getRandomNumber(fireballColors.length)];
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
      console.log(response);
      alert('Данные успешно отправлены');
      window.popupSetupWizard.setup.classList.add('hidden');
    }, function(string){
      console.log(string);
      alert(string);
    });
    evt.preventDefault();
  });

})();