var OFFICER = '\u{1F46E}';
var PISTOL = '\u{1F52B}';

var Ganster = function (nickname) {
    this.nickname = nickname;
    this.weapon = PISTOL;
    this.check = function () {
        return this.weapon;
    };
};

var isPoliceman = function(gangster) {
    return !(gangster instanceof Ganster);
};

var startFirefight = function (gang) {
    do {
        var random = Math.floor(Math.random() * gang.length);
        var gangster = gang.splice(random, 1)[0];

        if (isPoliceman(gangster)) {
            console.log('"' + gangster.nickname + '" оказался полицейским');
            return;
        }

        console.log('Проверяем "' + gangster.nickname + '":' + gangster.check());
    } while (gang.length > 1);

    console.log('Полицейский не был обнаружен, гангстеры проиграли!');
};

var mrBlonde = new Ganster('Мистер Блондин');
var mrPink = new Ganster('Мистер Розовый');
var mrOrange = new Ganster('Мистер Оранжевый');
var mrWhite = new Ganster('Мистер Белый');
var mrBlue = new Ganster('Мистер Синий');

var mrRed = {
    nickname: 'Мистер Красный',
    weapon: OFFICER,
    check: function () {
        return PISTOL;
    }
};

startFirefight([mrBlonde, mrPink, mrOrange, mrWhite, mrBlue, mrRed]);