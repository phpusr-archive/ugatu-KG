var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    var ctx;

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    var MAX_X = MAX_Y = 500;
    var MIN_X = MIN_Y = 0;
    var X0 = MAX_X/2, Y0 = MAX_Y/2;

    ctx = document.getElementById("myCanvas").getContext("2d");
    drawLine(MIN_X, MIN_Y, MAX_X, MAX_Y);
    drawLine(MAX_X/2, MIN_Y, MAX_X/2, MAX_Y);
    drawLine(MIN_X, MAX_Y/2, MAX_X, MAX_Y/2);

});
