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
        change: function(event, ui) {
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
    /** Рисование текста */
    function drawText(text, x, y) {
        ctx.fillStyle = "#00F";
        ctx.font = "normal 15pt Arial";
        ctx.fillText(text, x, y);
    }
    /** Очистка канвы */
    function clearCanvas() {
        ctx.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);
        //Рисование осей
        drawLine(MIN_X, MIN_Y, MAX_X, MAX_Y);
        drawLine(X0, MIN_Y, X0, MAX_Y);
        drawLine(MIN_X, Y0, MAX_X, Y0);

        var size = 20;
        drawText('X', MIN_X, Y0);
        drawText('-X', MAX_X-size, Y0);

        drawText('Z', X0, MAX_Y);
        drawText('-Z', X0, MIN_Y+size);

        drawText('-Y', MIN_X+size, MIN_Y+size);
        drawText('Y', MAX_X-size, MAX_Y-size);
    }

    var pointX = 0, pointY = 0;

    function changeSlider() {
        $scope.valX = $('#sliderX').slider('value');
        $scope.valY = $('#sliderY').slider('value');
        $scope.valZ = $('#sliderZ').slider('value');

        pointX = X0 - ($scope.valX - Math.round($scope.valY * Math.cos(45))) * 30;
        pointY = Y0 - ($scope.valZ - Math.round($scope.valY * Math.cos(45))) * 30;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }

        clearCanvas();
        drawPoint(pointX, pointY);
    }

    //Start
    changeSlider();
});
