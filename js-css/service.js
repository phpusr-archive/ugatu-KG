'use strict';

/**
 * Вторичные функции
 */

/** Рисование линии */
function drawLineXY(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.stroke();
}
/** Рисование окружности */
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}
/** Рисование текста */
function drawTextXY(text, x, y) {
    ctx.fillStyle = "#00F"; //TODO подумать над цветом заливки
    ctx.font = "normal 15pt Arial";
    ctx.fillText(text, x, y);
}
/** Очистка канвы */
function clearCanvas() {
    ctx.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);

    //Рисование осей
    var y1 = new Point(0, -100, 0);
    var y2 = new Point(0, 100, 0);
    y1.drawLine(y2);
    drawLineXY(X0, MIN_Y, X0, MAX_Y); //TODO возможно стоит все координаты переделать в 3D
    drawLineXY(MIN_X, Y0, MAX_X, Y0);

    //Заголовки осей
    var size = 20;
    drawTextXY('X', MIN_X, Y0);
    drawTextXY('-X', MAX_X-size, Y0);

    drawTextXY('Z', X0, MIN_Y+size);
    drawTextXY('-Z', X0, MAX_Y);

    drawTextXY('Y', MAX_X-size, MAX_Y-size);
    drawTextXY('-Y', MIN_X+size, MIN_Y+size);
}

/** Логирование координат Точки */
function logPoint(point, name) {
    //console.log(name + '(', point.x, ',', + point.y, ')');
    console.log(name + ':', point);
}

/** Ручное обновление вида */
function angularApply($scope) {
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
    }
}
