// Создания случайных волшебников

(function(){
  var mainWizardCoat = document.querySelector('.wizard-coat');
  var mainWizardEyes = document.querySelector('.wizard-eyes');
  var mainFireballWrap = document.querySelector('.setup-fireball-wrap');
  var howManyWizards = 4;
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Глобальная функция, которая возвращает случайное число от 0 до maxNumber
  window.getRandomNumber = function(maxNumber){
          return Math.floor(Math.random() * maxNumber);
        };

  // Функция для создания и отрисовки случайных волшебников
  var createAndDrawWizards = function(wizards){
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var DOMWizards = [];

    for(var i = 0; i < howManyWizards; i++){
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;
      DOMWizards[i] = wizardElement;
    };
    
    var similarList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    while(similarList.firstChild){
      similarList.removeChild(similarList.firstChild);
    };
  
    for(var j = 0; j < DOMWizards.length; j++){
      fragment.appendChild(DOMWizards[j]);
    };
    similarList.appendChild(fragment);
  };

  var wizards = [];
  var coatColor = mainWizardCoat.style.fill;
  var eyesColor = mainWizardEyes.style.fill;;

  var getRank = function(wizard){
    var rank = 0;

    if(wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if(wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  var namesComparator = function(left, right) {
    if(left > right){
      return 1;
    } else if (left < right){
      return -1;
    } else {
      return 0;
    }
  }

  var updateWizards = function(){
    createAndDrawWizards(wizards.sort(function(left, right){
      var rankDiff = getRank(right) - getRank(left);
      if(rankDiff === 0){
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  var lastTimeout;

  var debounce = function(fun){
    if(lastTimeout){
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function(){
      fun();
    }, 500);
  }

  var onCoatChange = function(evt){
    coatColor = coatColors[window.getRandomNumber(coatColors.length)];
    mainWizardCoat.style.fill = coatColor;
    debounce(updateWizards);
  }

  var onEyesChange = function(evt){
    eyesColor = eyesColors[window.getRandomNumber(eyesColors.length)];
    mainWizardEyes.style.fill = eyesColor;
    debounce(updateWizards);
  }

  mainWizardCoat.addEventListener('click', onCoatChange);
  mainWizardEyes.addEventListener('click', onEyesChange);

  mainFireballWrap.addEventListener('click', function(){
    mainFireballWrap.style.backgroundColor = fireballColors[window.getRandomNumber(fireballColors.length)];
  });

  var onLoad = function(data){
    wizards = data;
    updateWizards();
  }

  var onError = function(string){
    alert(string);
  }

  window.backend.load(onLoad, onError);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();