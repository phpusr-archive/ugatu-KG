'use strict';

/**
 * Вторичные функции
 */

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
