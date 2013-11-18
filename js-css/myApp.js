'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    ctx = document.getElementById("myCanvas").getContext("2d");

    function changeSlider() {
        clearCanvas();

        var valX = $('#sliderX').slider('value');
        var valY = $('#sliderY').slider('value');
        var valZ = $('#sliderZ').slider('value');

        var point = new Point(valX, valY, valZ);
        logPoint(point, 'point');

        //Проекция точки A
        var a1 = new Point(valY, valY, 0);
        logPoint(a1, 'a1');

        var a2 = new Point(0, valY, valZ);
        logPoint(a2, 'a2');

        drawPoint(a1);
        drawText('A1', a1);
        drawPoint(a2);
        drawText('A2', a2);
        drawLine(a1, a2);


        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }


        drawPoint(point);
    }

    //Start
    initSliders();
    changeSlider();
});
