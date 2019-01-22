// Создания случайных волшебников

(function(){
  var mainWizardCoat = document.querySelector('.wizard-coat');
  var mainWizardEyes = document.querySelector('.wizard-eyes');

  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var howManyWizads = 4;

  // Глобальная функция, которая возвращает случайное число от 0 до maxNumber
  window.getRandomNumber = function(maxNumber){
          return Math.floor(Math.random() * maxNumber);
        };

  //Функция, которая возвращает массив волшебников, где 
  // firstNames это массив из имен,
  // secondNames это массив из фамилий,
  // coatColors  это массив из цветов пальта, 
  // eyesColors это массив из цветов глаз,
  // howManyWizads это количество волшебников. 
  var getWizards = function(firstNames, secondNames, coatColors, eyesColors, howManyWizads){
    var wizards = [];
    for(var i = 0; i < howManyWizads; i++){
      var randomName;
      // Имя и фамилия случайным порядком меняються местами
      if(Math.round(Math.random())){
        randomName = firstNames[window.getRandomNumber(firstNames.length)] +  ' ' + secondNames[window.getRandomNumber(secondNames.length)];
      } else {
        randomName = secondNames[window.getRandomNumber(secondNames.length)] +  ' ' + firstNames[window.getRandomNumber(firstNames.length)];
      }
      wizards[i] = {
        name: randomName,
        coatColor: coatColors[window.getRandomNumber(coatColors.length)],
        eyesColor: eyesColors[window.getRandomNumber(eyesColors.length)]
      };
    };
    return wizards;
  };

  var wizards = getWizards(firstNames, secondNames, coatColors, eyesColors, howManyWizads);

  // Функция для создания и отрисовки волшебников
  var createAndDrawWizards = function(wizards){
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var DOMWizards = [];

    for(var i = 0; i < howManyWizads; i++){
      var wizardElement = similarWizardTemplate.cloneNode(true);
      var k = window.getRandomNumber(wizards.length - 1);
      wizardElement.querySelector('.setup-similar-label').textContent = wizards[k].name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[k].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[k].colorEyes;
      DOMWizards[i] = wizardElement;
    };
    
    var similarList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for(var j = 0; j < DOMWizards.length; j++){
      fragment.appendChild(DOMWizards[j]);
    };
    similarList.appendChild(fragment);
  };

  window.backend.load(function(response){
    createAndDrawWizards(response);
  }, function(string){
    alert(string);
  });


  document.querySelector('.setup-similar').classList.remove('hidden');
})();