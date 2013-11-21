'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.notSupport = 'Браузер не поддерживает Canvas';
    //Канва
    var cnvDim = document.getElementById("canvasDimensional").getContext("2d");
    var cnvCmplx = document.getElementById("canvasComplex").getContext("2d");

    var drwDim = new Drawing(cnvDim);
    var drwCmplx = new Drawing(cnvCmplx);

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
        clearCanvas(drwDim);

        valX = valX != null ? valX : $('#sliderX').slider('value');
        valY = valY != null ? valY : $('#sliderY').slider('value');
        valZ = valZ != null ? valZ : $('#sliderZ').slider('value');

        //TODO вынести рисование пространственного чертежа
        //Соединяющие точки
        var pointAxy = drwDim.createPoint(0, 0, valZ).drawPoint();
        var pointAxz = drwDim.createPoint(0, valY, 0).drawPoint();
        var pointAyz = drwDim.createPoint(valX, 0, 0).drawPoint();

        //Проекция точки A
        var pointAx = drwDim.createPoint(0, valY, valZ).drawPoint('Ax');
        var pointAy = drwDim.createPoint(valX, 0, valZ).drawPoint('Ay');
        var pointAz = drwDim.createPoint(valX, valY, 0).drawPoint('Az');
        pointAxy.drawLine(pointAx).drawLine(pointAy);
        pointAxz.drawLine(pointAx).drawLine(pointAz);
        pointAyz.drawLine(pointAy).drawLine(pointAz);

        //Точка A
        var pointA = drwDim.createPoint(valX, valY, valZ).drawPoint('A');
        pointA.drawLine(pointAz).drawLine(pointAx).drawLine(pointAy);

        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;

        //Отображение значений ползунков
        angularApply($scope);

        //Построение Комплексного чертежа
        drawComplex(valX, valY, valZ);
    }

    /** Построение Комплексного чертежа */
    function drawComplex(valX, valY ,valZ) {
        clearCanvas(drwCmplx); //TODO Ось координат для комплексного
        var pointA1 = drwCmplx.createPoint2D(valX, -valY).drawPoint('A1');
        var pointA2 = drwCmplx.createPoint2D(valX, valZ).drawPoint('A2');
        var pointA3 = drwCmplx.createPoint2D(-valY, valZ).drawPoint('A3');

        var pointAy = drwCmplx.createPoint2D(0, -valY).drawPoint('Ay');
        var pointAy1 = drwCmplx.createPoint2D(-valY, 0).drawPoint('Ay1');

        pointAy.drawLine(pointAy1).drawLine(pointA1);
        pointA3.drawLine(pointAy1).drawLine(pointA2);
        pointA1.drawLine(pointA2);
    }

    //Start
    initSliders();
    changeSlider();
});
