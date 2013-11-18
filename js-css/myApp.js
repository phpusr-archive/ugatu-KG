var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    $('div.slider').slider({
        range: 'max', min: 0, max: 10, value: 2
    });

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    $scope.changeSlider = function() {
        $scope.valX = $('#sliderX').slider('value');
        $scope.valY = $('#sliderY').slider('value');
        $scope.valZ = $('#sliderZ').slider('value');
    };

    //Константы
    var MAX_X = 500, MAX_Y = MAX_X;
    var MIN_X = 0, MIN_Y = MIN_X;
    var X0 = MAX_X/2, Y0 = MAX_Y/2;

    //Рисование осей
    drawLine(MIN_X, MIN_Y, MAX_X, MAX_Y);
    drawLine(MAX_X/2, MIN_Y, MAX_X/2, MAX_Y);
    drawLine(MIN_X, MAX_Y/2, MAX_X, MAX_Y/2);

    $scope.changeSlider();
});
