'use strict';

/**
 * Вторичные функции
 */

/** Очистка канвы */
function clearCanvas(drawing) {
    drawing.clearCanvas();

    //Рисование осей
    var y1 = new Point(0, -100, 0);
    var y2 = new Point(0, 100, 0);
    y1.drawLine(y2);
    drawing.drawLineXY(X0, MIN_Y, X0, MAX_Y); //TODO возможно стоит все координаты переделать в 3D
    drawing.drawLineXY(MIN_X, Y0, MAX_X, Y0);

    //Заголовки осей
    var size = 20;
    drawing.drawTextXY('X', MIN_X, Y0);
    drawing.drawTextXY('-X', MAX_X-size, Y0);

    drawing.drawTextXY('Z', X0, MIN_Y+size);
    drawing.drawTextXY('-Z', X0, MAX_Y);

    drawing.drawTextXY('Y', MAX_X-size, MAX_Y-size);
    drawing.drawTextXY('-Y', MIN_X+size, MIN_Y+size);
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
