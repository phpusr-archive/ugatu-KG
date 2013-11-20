'use strict';

/**
 * Вторичные функции
 */

/** Очистка канвы */
function clearCanvas(drw) {
    drw.clearCanvas();

    //Рисование осей
    var y1 = drw.createPoint(0, -100, 0);
    var y2 = drw.createPoint(0, 100, 0);
    y1.drawLine(y2);
    drw.drawLineXY(X0, MIN_Y, X0, MAX_Y); //TODO возможно стоит все координаты переделать в 3D
    drw.drawLineXY(MIN_X, Y0, MAX_X, Y0);

    //Заголовки осей
    var size = 20;
    drw.drawTextXY('X', MIN_X, Y0);
    drw.drawTextXY('-X', MAX_X-size, Y0);

    drw.drawTextXY('Z', X0, MIN_Y+size);
    drw.drawTextXY('-Z', X0, MAX_Y);

    drw.drawTextXY('Y', MAX_X-size, MAX_Y-size);
    drw.drawTextXY('-Y', MIN_X+size, MIN_Y+size);
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
