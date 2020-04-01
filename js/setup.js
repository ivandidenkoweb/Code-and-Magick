// Модуль отрисовки магов

(function () {
    //  функция создания DOM-элемента на основе JS-объекта

    var wizards = null;

    var createWizard = function (wizard) {
        var similarWizardTemplate = document.querySelector('#similar-wizard-template')
            .content
            .querySelector('.setup-similar-item');
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

        return wizardElement;
    };

    // функция заполнения блока DOM-элементами на основе массива JS-объектов

    var renderWizards = function (wizards) {
        var similarListElement = document.querySelector('.setup-similar-list');
        similarListElement.innerHTML = '';
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 4; i++) {
            fragment.appendChild(createWizard(wizards[i]));
        }
        similarListElement.appendChild(fragment);
    };

    // Обновление волшебников

    var getRank = function (wizard) {
        var rank = 0;

        if (wizard.colorCoat === window.coatColor) {
            rank += 2;
        }
        if (wizard.colorEyes === window.eyesColor) {
            rank += 1;
        }
        return rank;
    };

    var namesComparator = function (left, right) {
      if (left > right) {
          return 1;
      } else if (left < right) {
          return -1;
      } else {
          return 0;
      }
    };

    window.updateWizards = function () {
        wizards = wizards.slice().sort(function (left, right) {
            var rankDiff = getRank(right) - getRank(left);
            if (rankDiff === 0) {
                rankDiff = namesComparator(left.name, right.name);
            }
            return rankDiff;
        });
        renderWizards(wizards);
    };

    var onLoad = function (data) {
        wizards = data;
        renderWizards(wizards);
    };

    window.onError = function (errorMessage) {
        var node = document.createElement('div');

        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(onLoad, window.onError);

})();