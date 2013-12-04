'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.subject = 'КГ';
    $scope.lab = 'Лаба 2 (Пересечение плоскости и точки)';
    $scope.notSupport = 'Браузер не поддерживает Canvas';

    //Канва
    var cnvDim = document.getElementById('canvasDimensional').getContext("2d");
    var cnvCmplx = document.getElementById('canvasComplex').getContext("2d");

    $('#canvasDimensional').attr('width', MAX_X).attr('height', MAX_Y);
    $('#canvasComplex').attr('width', MAX_X).attr('height', MAX_Y);
    $('#drawBlock').css('width', BLOCK_WIDTH);
    $('#slider-block').css('width', SLIDER_WIDTH);

    var drwDim = new Drawing(cnvDim, 'dim');
    var drwCmplx = new Drawing(cnvCmplx, 'cmplx');
    var points = [
        {text: 'A', p: drwDim.createPoint3D(3,7,2)},
        {text: 'B', p: drwDim.createPoint3D(3,1,8)},
        {text: 'C', p: drwDim.createPoint3D(10,6,9)},
        {text: 'M', p: drwDim.createPoint3D(9,2,1)},
        {text: 'N', p: drwDim.createPoint3D(1,3,4)}
    ];
    $scope.points = points;
    var current = {point: 0};
    $scope.current = current;

    /** Инициализация слайдеров */
    function initSliders() {
        $('#sliderX').slider({
            range: 'max', min: 0, max: 10, value: 0,
            slide: function(event, ui) {
                repaintDrawing(ui.value, null, null);
            }
        });
        $('#sliderY').slider({
            range: 'max', min: 0, max: 10, value: 0,
            slide: function(event, ui) {
                repaintDrawing(null, ui.value, null);
            }
        });
        $('#sliderZ').slider({
            range: 'max', min: 0, max: 10, value: 0,
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
        drawComplex();
    }

    /** Построение Пространственного чертежа */
    function drawDimensional(valX, valY ,valZ) {
        //Очистка канвы и построение осей
        drwDim.drawAxis();

        points[current.point].p = drwDim.createPoint3D(valX, valY, valZ);

        var pointA = points[0].p;
        var pointB = points[1].p;
        var pointC = points[2].p;
        var pointM = points[3].p;
        var pointN = points[4].p;

        //Вычисление коэффициентов плоскости
        var A = (pointA.y3D-pointB.y3D) * (pointA.z3D+pointB.z3D) + (pointB.y3D-pointC.y3D) * (pointB.z3D+pointC.z3D) + (pointC.y3D-pointA.y3D) * (pointC.z3D+pointA.z3D);
        var B = (pointA.z3D-pointB.z3D) * (pointA.x3D+pointB.x3D) + (pointB.z3D-pointC.z3D) * (pointB.x3D+pointC.x3D) + (pointC.z3D-pointA.z3D) * (pointC.x3D+pointA.x3D);
        var C = (pointA.x3D-pointB.x3D) * (pointA.y3D+pointB.y3D) + (pointB.x3D-pointC.x3D) * (pointB.y3D+pointC.y3D) + (pointC.x3D-pointA.x3D) * (pointC.y3D+pointA.y3D);
        var D = -(A * pointA.x3D + B * pointA.y3D + C * pointA.z3D);

        //Нахождение точки пересечения плоскости с прямой
        if ((A*(pointM.x3D - pointN.x3D) + B*(pointM.y3D - pointN.y3D) + C*(pointM.z3D - pointN.z3D)) != 0) {
            var t = (A*pointM.x3D + B*pointM.y3D + C*pointM.z3D + D) / (A*(pointM.x3D-pointN.x3D) + B*(pointM.y3D-pointN.y3D) + C*(pointM.z3D-pointN.z3D));

            if (t>=0 && t<=1) {
                var xT = pointM.x3D + (pointN.x3D-pointM.x3D)*t;
                var yT = pointM.y3D + (pointN.y3D-pointM.y3D)*t;
                var zT = pointM.z3D + (pointN.z3D-pointM.z3D)*t;

                var pointT = drwDim.createPoint3D(xT, yT, zT);
                pointT.drawPoint('T', COLOR_HIGHLIGHT);
            }
        }

        //Определение видимости отрезка
        if (B<0) {
            A = -A; B = -B; C = -C; D = -D;
        }

        var visibleM;
        var tmpM = A*pointM.x3D + B*pointM.y3D + C*pointM.z3D + D;
        if (tmpM > 0) {
            visibleM = true;
        } else if (tmpM < 0) {
            visibleM = false;
        }

        var visibleN;
        var tmpN = A*pointN.x3D + B*pointN.y3D + C*pointN.z3D + D;
        var delta = 0.01; //TODO какое значение поставить?
        var tmpMN = (A==0 && B==0 && C==0) || (A*(pointM.x3D-pointN.x3D) + B*(pointM.y3D-pointN.y3D) + C*(pointM.z3D-pointN.z3D))==0 || (Math.abs(B) < delta);
        if (tmpN > 0) {
            visibleN = true;
        } else if (tmpN < 0) {
            visibleN = false;
        } else if (tmpMN) {
            visibleM = true;
            visibleN = true;
        }

        //Построение чертежа
        for (var i= 0; i<points.length; i++) {
            points[i].p.drawProjection(points[i].text)
        }
        pointA.drawLine(pointB, COLOR_HIGHLIGHT).drawLine(pointC, COLOR_HIGHLIGHT);
        pointB.drawLine(pointC, COLOR_HIGHLIGHT);

        if (visibleM) pointM.drawPoint('M');
        if (visibleN) pointN.drawPoint('N');
        pointM.drawLine(pointN, COLOR_HIGHLIGHT);
    }

    /** Построение Комплексного чертежа */
    function drawComplex() {
        //Очистка канвы и построение осей
        drwCmplx.drawAxis();

        for (var i= 0; i<points.length; i++) {
            points[i].p.drawComplex(drwCmplx, points[i].text);
        }
    }

    //Start
    initSliders();
    $scope.changePoint();
});
