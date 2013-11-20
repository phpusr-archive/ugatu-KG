'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    ctx = document.getElementById("myCanvas").getContext("2d");

    /** Инициализация слайдеров (III-октант) */
    function initSliders() {
        $('#sliderX').slider({
            range: 'max', min: -10, max: 10, value: 0,
            slide: function(event, ui) {
                changeSlider(ui.value, null, null);
            }
        });
        $('#sliderY').slider({
            range: 'max', min: -10, max: 10, value: 0,
            slide: function(event, ui) {
                changeSlider(null, ui.value, null);
            }
        });
        $('#sliderZ').slider({
            range: 'max', min: -10, max: 10, value: 0,
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

        var p = new Point(valX, valY, valZ);

        //Проекция точки A
        var aX = new Point(0, valY, valZ);
        var aY = new Point(valX, 0, valZ);
        var aZ = new Point(valX, valY, 0);

        aX.drawPoint('Ax');
        aY.drawPoint('Ay');
        aZ.drawPoint('Az');

        p.drawLine(aZ);
        p.drawLine(aX);
        p.drawLine(aY);


        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }


        p.drawPoint('P');
    }

    //Start
    initSliders();
    changeSlider();
});
