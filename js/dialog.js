// Открытие/закрытие окна настройки персонажа:

(function () {
    var setupOpen = document.querySelector('.setup-open');
    var setup = document.querySelector('.setup');
    var setupClose = setup.querySelector('.setup-close');
    var userName = setup.querySelector('input[name="username"]');
    var form = document.querySelector('.setup-wizard-form');

    setupCoords = {
        top: 80 + 'px',
        left: '50%'
    };

    setup.querySelector('.setup-similar').classList.remove('hidden');

    var onPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closePopup);
    };

    var openPopup = function () {
        setup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
        setup.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
        setup.style.top = setupCoords.top;
        setup.style.left = setupCoords.left;
    };

    setupOpen.addEventListener('click', openPopup);

    setupOpen.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup);
    });

    setupClose.addEventListener('click', closePopup);

    setupClose.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
    });

    userName.addEventListener('focusin', function () {
        document.removeEventListener('keydown', onPopupEscPress);
        setupClose.removeEventListener('click', closePopup);
    });

    userName.addEventListener('focusout', function () {
        document.addEventListener('keydown', onPopupEscPress);
        setupClose.addEventListener('click', closePopup);
    });

    var onLoad = function () {
        setup.classList.add('hidden');
    };
    
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        window.backend.save(new FormData(form), onLoad, window.onError);
    });
})();
