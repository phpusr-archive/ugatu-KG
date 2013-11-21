'use strict';

/**
 * Вторичные функции
 */

/** Очистка канвы */
function clearCanvas(drw, type) {
    drw.clearCanvas();

    //Рисование осей
    if (type == 'dim') {
        var y1 = drw.createPoint(0, -100, 0);
        var y2 = drw.createPoint(0, 100, 0);
        y1.drawLine(y2);
    }
    drw.drawLineXY(X0, MIN_Y, X0, MAX_Y); //TODO возможно стоит все координаты переделать в 3D
    drw.drawLineXY(MIN_X, Y0, MAX_X, Y0);

    //Заголовки осей
    var size = 30;
    var titles = {
        dim: [{title: 'X', x: MIN_X, y: Y0}, {title: '-X', x: MAX_X-size, y: Y0},
            {title: 'Z', x: X0, y: MIN_Y+size}, {title: '-Z', x: X0, y: MAX_Y-size},
            {title: 'Y', x: MAX_X-size, y: MAX_Y-size}, {title: '-Y', x: MIN_X+size, y: MIN_Y+size}],
        cmplx: [{title: 'X', x: MIN_X, y: Y0}, {title: 'Y1', x: MAX_X-size, y: Y0},
            {title: 'Z', x: X0, y: MIN_Y+size}, {title: 'Y', x: X0, y: MAX_Y-size}]
    };

    $.each(titles[type], function() {
        drw.drawTextXY(this.title, this.x, this.y);
    });
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
