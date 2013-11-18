'use strict';

/** App Module */

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    ctx = document.getElementById("myCanvas").getContext("2d");

    var pX = 0, pY = 0;

    function changeSlider() {
        clearCanvas();

        var valX = $('#sliderX').slider('value');
        var valY = $('#sliderY').slider('value');
        var valZ = $('#sliderZ').slider('value');

        pX = getX(valX, valY);
        pY = getY(valZ, valY);
        console.log('pX=', pX, 'pY=', pY);

        //Проекция точки A
        var a1x = getX(valX, valY);
        var a1y = getX(0, valY);
        console.log('a1x=', a1x, 'a1y=', a1y);

        var a2x = getX(0, valY);
        var a2y = getX(valZ, valY);
        console.log('a2x=', a2x, 'a2y=', a2y);

        drawPoint(a1x, a1y);
        drawText('A1', a1x, a1y);
        drawPoint(a2x, a2y);
        drawText('A2', a2x, a2y);
        drawLine(a1x, a1y, a2x, a2y);


        $scope.valX = valX;
        $scope.valY = valY;
        $scope.valZ = valZ;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }


        drawPoint(pX, pY);
    }

    //Start
    initSliders();
    changeSlider();
});
