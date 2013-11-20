'use strict';

/**
 * Класс: Точка
 */
function Point(drawing, x, y) {
    this.x = x;
    this.y = y;

    /** Рисование точки */
    this.drawPoint = function(pointName) {
        drawing.drawCircle(this.x, this.y, 5);
        if (pointName) this.drawText(pointName);

        return this;
    };
    /** Рисование текста */
    this.drawText = function (text) {
        drawing.drawTextXY(text, this.x, this.y);

        return this;
    };
    /** Рисование линии */
    this.drawLine = function (pointTo) {
        drawing.drawLineXY(this.x, this.y, pointTo.x, pointTo.y);

        return this;
    };
}

/**
 * Класс: Canvas
 */
function Drawing(canvas) {
    var alpha = 45;

    /** Создание точки */
    this.createPoint = function(x3D, y3D, z3D) {
        var x = getX(x3D, y3D);
        var y = getY(z3D, y3D);

        return new Point(this, x, y);
    };

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
