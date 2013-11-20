'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    ctx = document.getElementById("myCanvas").getContext("2d");

    /** Инициализация слайдеров (III-октант) */
    function initSliders() {
        $('#sliderX').slider({
            range: 'max', min: -10, max: 10, value: -7,
            slide: function(event, ui) {
                changeSlider(ui.value, null, null);
            }
        });
        $('#sliderY').slider({
            range: 'max', min: -10, max: 10, value: -5,
            slide: function(event, ui) {
                changeSlider(null, ui.value, null);
            }
        });
        $('#sliderZ').slider({
            range: 'max', min: -10, max: 10, value: -6,
            slide: function(event, ui) {
                changeSlider(null, null, ui.value);
            }
        });
    }

    function changeSlider(valX, valY ,valZ) {
        clearCanvas();

        valX = valX != null ? valX : $('#sliderX').slider('value');
        valY = valY != null ? valY : $('#sliderY').slider('value');
        valZ = valZ != null ? valZ : $('#sliderZ').slider('value');

        //Соединяющие точки
        var aXY = new Point(0, 0, valZ).drawPoint();
        var aXZ = new Point(0, valY, 0).drawPoint();
        var aYZ = new Point(valX, 0, 0).drawPoint();

        //Проекция точки A
        var aX = new Point(0, valY, valZ).drawPoint('Ax');
        var aY = new Point(valX, 0, valZ).drawPoint('Ay');
        var aZ = new Point(valX, valY, 0).drawPoint('Az');
        aXY.drawLine(aX).drawLine(aY);
        aXZ.drawLine(aX).drawLine(aZ);
        aYZ.drawLine(aY).drawLine(aZ);

        //Точка A
        var a = new Point(valX, valY, valZ).drawPoint('A');
        a.drawLine(aZ).drawLine(aX).drawLine(aY);

        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }

    }

    //Start
    initSliders();
    changeSlider();
});
