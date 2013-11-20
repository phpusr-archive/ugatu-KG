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
        drawCircle(this.x, this.y, 5);
        if (pointName) this.drawText(pointName);

        return this;
    };
    /** Рисование текста */
    this.drawText = function (text) {
        drawTextXY(text, this.x, this.y);

        return this;
    };
    /** Рисование линии */
    this.drawLine = function (pointTo) {
        drawLineXY(this.x, this.y, pointTo.x, pointTo.y);

        return this;
    };
}
