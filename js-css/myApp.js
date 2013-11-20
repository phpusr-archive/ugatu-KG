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
        var pointAxy = new Point(0, 0, valZ).drawPoint();
        var pointAxz = new Point(0, valY, 0).drawPoint();
        var pointAyz = new Point(valX, 0, 0).drawPoint();

        //Проекция точки A
        var pointAx = new Point(0, valY, valZ).drawPoint('Ax');
        var pointAy = new Point(valX, 0, valZ).drawPoint('Ay');
        var pointAz = new Point(valX, valY, 0).drawPoint('Az');
        pointAxy.drawLine(pointAx).drawLine(pointAy);
        pointAxz.drawLine(pointAx).drawLine(pointAz);
        pointAyz.drawLine(pointAy).drawLine(pointAz);

        //Точка A
        var pointA = new Point(valX, valY, valZ).drawPoint('A');
        pointA.drawLine(pointAz).drawLine(pointAx).drawLine(pointAy);

        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
    }

    //Start
    initSliders();
    changeSlider();
});
