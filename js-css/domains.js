'use strict';

/**
 * Класс: Точка
 */
function Point(x3D, y3D, z3D) {
    var alpha = 45;

    this.x = getX(x3D, y3D);
    this.y = getY(z3D, y3D);

    /** X - координата в 2D */
    function getX(x3D, y3D) {
        var v1 = X0 - (x3D - Math.round(y3D * Math.cos(alpha))) * SCALE; //Криво по Y
        var v2 = X0 - Math.round((x3D - y3D * Math.cos(alpha)) * SCALE); //Нормально по Y

        return v2;
    }
    /** Y - координата в 2D */
    function getY(z3D, y3D) {
        var v1 = Y0 - (z3D - Math.round(y3D * Math.sin(alpha))) * SCALE;
        var v2 = Y0 - Math.round((z3D - y3D * Math.sin(alpha)) * SCALE);

        return v2;
    }

    /** Рисование точки */
    this.drawPoint = function(pointName) {
        drawing1.drawCircle(this.x, this.y, 5); //TODO
        if (pointName) this.drawText(pointName);

        return this;
    };
    /** Рисование текста */
    this.drawText = function (text) {
        drawing1.drawTextXY(text, this.x, this.y); //TODO

        return this;
    };
    /** Рисование линии */
    this.drawLine = function (pointTo) {
        drawing1.drawLineXY(this.x, this.y, pointTo.x, pointTo.y); //TODO

        return this;
    };
}

/**
 * Класс: Canvas
 */
function Drawing(canvas) {
    function addPoint() {
        //TODO
    }

    /** Рисование текста */
    this.drawTextXY = function(text, x, y) {
        canvas.fillStyle = "#00F"; //TODO подумать над цветом заливки
        canvas.font = "normal 15pt Arial";
        canvas.fillText(text, x, y);
    };

    /** Рисование линии */
    this.drawLineXY = function(x1, y1, x2, y2) {
        canvas.beginPath();
        canvas.moveTo(x1, y1);
        canvas.lineTo(x2, y2);
        canvas.lineWidth = 2;
        canvas.stroke();
    };

    /** Рисование окружности */
    this.drawCircle = function(x, y, radius) {
        canvas.beginPath();
        canvas.arc(x, y, radius, 0, Math.PI*2, false);
        canvas.closePath();
        canvas.fill();
    };

    /** Очистка канвы */
    this.clearCanvas = function() {
        canvas.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);
    }
}
