// Изменение цвета мантии, глаз, фаербола персонажа по нажатию

(function () {
    var setupWizard = document.querySelector('.setup-wizard');
    var selectorInputCoat = 'input[name="coat-color"]';
    var selectorInputEyes = 'input[name="eyes-color"]';
    var selectorInputFireball = 'input[name="fireball-color"]';
    var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
    var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

    var drawColor = function (evt, arrColors, selector) {
        var color = window.util.getRandomValue(arrColors);

        if (evt.target.tagName === 'use') {
            evt.target.style.fill = color;
        } else {
            evt.target.style.backgroundColor = color;
        }
        document.querySelector(selector).setAttribute('value', color);
        return color;
    };

    setupWizard.querySelector('.wizard-coat').addEventListener('click', function (evt) {
        window.coatColor = drawColor(evt, coatColors, selectorInputCoat);
        window.debounce(window.updateWizards);
    });

    setupWizard.querySelector('.wizard-eyes').addEventListener('click', function (evt) {
        window.eyesColor = drawColor(evt, eyesColors, selectorInputEyes);
        window.debounce(window.updateWizards);
    });

    document.querySelector('.setup-fireball-wrap').addEventListener('click', function (evt) {
        drawColor(evt, fireballColors, selectorInputFireball);
    });
})();