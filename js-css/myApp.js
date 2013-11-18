var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    //Канва
    var ctx = document.getElementById("myCanvas").getContext("2d");
    //Константы
    var MAX_X = 500, MAX_Y = MAX_X;
    var MIN_X = 0, MIN_Y = MIN_X;
    var X0 = MAX_X/2, Y0 = MAX_Y/2;

    //Инициализация слайдеров
    $('div.slider').slider({
        range: 'max', min: 0, max: 10, value: 2,
        slide: function(event, ui) {
            changeSlider();
        }
    });

    /** Рисование линии */
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    /** Рисование окружности */
    function drawCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }
    /** Рисование точки */
    function drawPoint(x, y) {
        drawCircle(x, y, 5)
    }
    /** Очистка канвы */
    function clearCanvas() {
        ctx.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);
        //Рисование осей
        drawLine(MIN_X, MIN_Y, MAX_X, MAX_Y);
        drawLine(MAX_X/2, MIN_Y, MAX_X/2, MAX_Y);
        drawLine(MIN_X, MAX_Y/2, MAX_X, MAX_Y/2);
    }

    var pointX = 0, pointY = 0;

    function changeSlider() {
        $scope.valX = $('#sliderX').slider('value');
        $scope.valY = $('#sliderY').slider('value');
        $scope.valZ = $('#sliderZ').slider('value');

        pointX = $scope.valX*10;
        pointY = $scope.valY*10;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }

        clearCanvas();
        drawPoint(pointX, pointY);
    }

    //Start
    $scope.changeSlider();
});
