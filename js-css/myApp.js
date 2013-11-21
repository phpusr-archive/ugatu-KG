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
                repaintDrawing(ui.value, null, null);
            }
        });
        $('#sliderY').slider({
            range: 'max', min: -10, max: 10, value: -5,
            slide: function(event, ui) {
                repaintDrawing(null, ui.value, null);
            }
        });
        $('#sliderZ').slider({
            range: 'max', min: -10, max: 10, value: -6,
            slide: function(event, ui) {
                repaintDrawing(null, null, ui.value);
            }
        });
    }

    /** Перерисовка чертежей */
    function repaintDrawing(valX, valY ,valZ) {

        valX = valX != null ? valX : $('#sliderX').slider('value');
        valY = valY != null ? valY : $('#sliderY').slider('value');
        valZ = valZ != null ? valZ : $('#sliderZ').slider('value');

        //Отображение значений ползунков
        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        angularApply($scope);

        //Построение Пространственного чертежа
        drawDimensional(valX, valY, valZ);
        //Построение Комплексного чертежа
        drawComplex(valX, valY, valZ);
    }

    /** Построение Пространственного чертежа */
    function drawDimensional(valX, valY ,valZ) {
        clearCanvas(drwDim, 'dim');

        //Проекция точки A
        var pointAx = drwDim.createPoint(valX, 0, 0).drawPoint('Ax');
        var pointAy = drwDim.createPoint(0, valY, 0).drawPoint('Ay');
        var pointAz = drwDim.createPoint(0, 0, valZ).drawPoint('Az');

        var pointA1 = drwDim.createPoint(valX, valY, 0).drawPoint('A1');
        var pointA2 = drwDim.createPoint(valX, 0, valZ).drawPoint('A2');
        var pointA3 = drwDim.createPoint(0, valY, valZ).drawPoint('A3');

        pointAz.drawLine(pointA3).drawLine(pointA2);
        pointAy.drawLine(pointA3).drawLine(pointA1);
        pointAx.drawLine(pointA2).drawLine(pointA1);

        //Точка A
        var pointA = drwDim.createPoint(valX, valY, valZ).drawPoint('A');
        pointA.drawLine(pointA1).drawLine(pointA2).drawLine(pointA3);
    }

    /** Построение Комплексного чертежа */
    function drawComplex(valX, valY ,valZ) {
        clearCanvas(drwCmplx, 'cmplx');

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
    repaintDrawing();
});
