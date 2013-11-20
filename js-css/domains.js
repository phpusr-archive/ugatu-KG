'use strict';

/**
 * Класс: Точка
 */
function Point(x, y, z) {
    this.x = getX(x, y);
    this.y = getY(z, y);

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
