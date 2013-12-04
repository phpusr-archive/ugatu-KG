'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.subject = 'КГ';
    $scope.lab = 'Лаба 1 (Точка в 3-D пространстве)';
    $scope.notSupport = 'Браузер не поддерживает Canvas';

    //Канва
    var cnvDim = document.getElementById('canvasDimensional').getContext("2d");
    var cnvCmplx = document.getElementById('canvasComplex').getContext("2d");

    $('#canvasDimensional').attr('width', MAX_X).attr('height', MAX_Y);
    $('#canvasComplex').attr('width', MAX_X).attr('height', MAX_Y);
    $('#drawBlock').css('width', BLOCK_WIDTH);
    $('#sliderBlock').css('width', SLIDER_WIDTH);

    var drwDim = new Drawing(cnvDim, 'dim');
    var points = [
        {text: 'A', p: drwDim.createPoint3D(0,0,0)},
        {text: 'B', p: drwDim.createPoint3D(0,0,0)},
        {text: 'C', p: drwDim.createPoint3D(0,0,0)},
        {text: 'M', p: drwDim.createPoint3D(0,0,0)},
        {text: 'N', p: drwDim.createPoint3D(0,0,0)}
    ];
    $scope.points = points;
    var current = {point: 0};
    $scope.current = current;

    /** Инициализация слайдеров */
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

    $scope.changePoint = function() {
        console.log('point: ', current.point);
        var point = points[current.point].p;

        $('#sliderX').slider('value', point.x3D);
        $('#sliderY').slider('value', point.y3D);
        $('#sliderZ').slider('value', point.z3D);
        repaintDrawing();
    };

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
        //drawComplex(valX, valY, valZ);
    }

    /** Построение Пространственного чертежа */
    function drawDimensional(valX, valY ,valZ) {

        //Очистка канвы и построение осей
        drwDim.drawAxis();

        points[current.point].p = drwDim.createPoint3D(valX, valY, valZ);

        for (var i=0; i<points.length; i++) {
            var point = points[i];
            point.p.drawPoint(point.text);
        }
    }

    /** Построение Комплексного чертежа */
    function drawComplex(valX, valY ,valZ) {
        var drwCmplx = new Drawing(cnvCmplx, 'cmplx');

        //Очистка канвы и построение осей
        drwCmplx.drawAxis();

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
