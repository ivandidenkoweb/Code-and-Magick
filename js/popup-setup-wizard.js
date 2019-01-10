// Настройка сценария поведения пользователя в окне настроек волшебника 

(function(){
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var mainWizardCoat = document.querySelector('.wizard-coat');
  var mainWizardEyes = document.querySelector('.wizard-eyes');
  var mainFireballWrap = document.querySelector('.setup-fireball-wrap');
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.popupSetupWizard = {
    ESCKEYCODE : 27,
    ENTERKEYCODE : 13
  };

  // Функция, которая закрывает окно настроек волшебника при нажатии Esc
  var onPopupEscPress = function(evt){
    if (evt.keyCode === window.popupSetupWizard.ESCKEYCODE){
      closePopup();
    };
  };

  // Функция, которая открывает окно настроек волшебника
  var openPopup = function(){
    setup.classList.remove('hidden');
    document.addEventListener('keydown',
     onPopupEscPress);
  };

  // Функция, которая закрывает окно настроек волшебника
  var closePopup = function(){
    setup.classList.add('hidden');
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
})();