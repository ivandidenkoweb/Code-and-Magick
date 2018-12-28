var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var howManyObj = 4;

var getRandomData = function(firstNames, secondNames, coatColors, eyesColors, howManyObj){
  var getRandomNumber = function(maxNumber){
    return Math.floor(Math.random() * maxNumber);
  };
  var randomData = [];
  for(var i = 0; i < howManyObj; i++){
    var randomName = null;
    if(Math.round(Math.random())){
      randomName = firstNames[getRandomNumber(firstNames.length)] +  ' ' + secondNames[getRandomNumber(secondNames.length)];
    } else {
      randomName = secondNames[getRandomNumber(secondNames.length)] +  ' ' + firstNames[getRandomNumber(firstNames.length)];
    }
    randomData[i] = {
      name: randomName,
      coatColor: coatColors[getRandomNumber(coatColors.length)],
      eyesColor: eyesColors[getRandomNumber(eyesColors.length)]
    };
  };
  return randomData;
};

var wizards = getRandomData(firstNames, secondNames, coatColors, eyesColors, howManyObj);
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var createWizards = function(wizards){
  var wizardsElements = [];
  for(var i = 0; i < wizards.length; i++){
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    wizardsElements[i] = wizardElement;
  };
  return wizardsElements;
};

var wizardsElements = createWizards(wizards);
var similarListElement = document.querySelector('.setup-similar-list');

var drawWizards = function(wizardsElements){
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < wizardsElements.length; i++){
    fragment.appendChild(wizardsElements[i]);
  };
  similarListElement.appendChild(fragment);
};

drawWizards(wizardsElements);

var similarWizards = document.querySelector('.setup-similar');
similarWizards.classList.remove('hidden');


