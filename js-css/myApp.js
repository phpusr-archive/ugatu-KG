'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    ctx = document.getElementById("myCanvas").getContext("2d");

    /** Инициализация слайдеров (III-октант) */
    function initSliders() {
        $('#sliderX').slider({
            range: 'max', min: 0, max: 10, value: 0,
            change: function(event, ui) {
                changeSlider();
            }
        });
        $('#sliderY').slider({
            range: 'max', min: -10, max: 0, value: 0,
            change: function(event, ui) {
                changeSlider();
            }
        });
        $('#sliderZ').slider({
            range: 'max', min: -10, max: 0, value: 0,
            change: function(event, ui) {
                changeSlider();
            }
        });
    }

    function changeSlider() {
        clearCanvas();

        var valX = $('#sliderX').slider('value');
        var valY = $('#sliderY').slider('value');
        var valZ = $('#sliderZ').slider('value');

        var p = new Point(valX, valY, valZ);
        logPoint(p, 'p');

        //Проекция точки A
        var a1 = new Point(valY, valY, 0);
        logPoint(a1, 'a1');

        var a2 = new Point(0, valY, valZ);
        logPoint(a2, 'a2');

        var a3 = new Point(valX, 0, valZ);
        logPoint(a3, 'a3');

        drawPoint(a1);
        drawText('A1', a1);
        drawPoint(a2);
        drawText('A2', a2);
        drawPoint(a3);
        drawText('A3', a3);

        /*drawLine(a1, a2);
        drawLine(a1, a3);
        drawLine(a2, a3);*/

        drawLine(p, a1);
        drawLine(p, a2);
        drawLine(p, a3);


        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }


        drawPoint(p);
    }

    //Start
    initSliders();
    changeSlider();
});
