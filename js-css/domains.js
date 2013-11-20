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
        return X0 - (x3D - Math.round(y3D * Math.cos(alpha))) * SCALE;
    }
    /** Y - координата в 2D */
    function getY(z3D, y3D) {
        return Y0 - (z3D - Math.round(y3D * Math.sin(alpha))) * SCALE;
    }

    /** Рисование точки */
    this.drawPoint = function(pointName) {
        drawCircle(this.x, this.y, 5);
        if (pointName) this.drawText(pointName);
    };
    /** Рисование текста */
    this.drawText = function (text) {
        drawTextXY(text, this.x, this.y);
    };
    /** Рисование линии */
    this.drawLine = function (pointTo) {
        drawLineXY(this.x, this.y, pointTo.x, pointTo.y);
    };
}
