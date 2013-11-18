'use strict';

/**
 * Вторичные функции
 */

/** X - координата в 2D */
function getX(x3D, y3D) {
    return X0 - (x3D - Math.round(y3D * Math.cos(45))) * SCALE
}
/** Y - координата в 2D */
function getY(z3D, y3D) {
    return Y0 - (z3D - Math.round(y3D * Math.sin(45))) * SCALE
}

/** Рисование линии */
function drawLineXY(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.stroke();
}
/** TODO */
function drawLine(point1, point2) {
    drawLineXY(point1.x, point1.y, point2.x, point2.y);
}
/** Рисование окружности */
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}
/** Рисование точки */
function drawPoint(point) { //TODO встроить вывод текста
    drawCircle(point.x, point.y, 5);
}
/** Рисование текста */
function drawTextXY(text, x, y) {
    ctx.fillStyle = "#00F"; //TODO подумать над цветом заливки
    ctx.font = "normal 15pt Arial";
    ctx.fillText(text, x, y);
}
/** TODO */
function drawText(text, point) {
    drawTextXY(text, point.x, point.y);
}
/** Очистка канвы */
function clearCanvas() {
    ctx.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);

    //Рисование осей
    drawLineXY(MIN_X, MIN_Y, MAX_X, MAX_Y);
    drawLineXY(X0, MIN_Y, X0, MAX_Y);
    drawLineXY(MIN_X, Y0, MAX_X, Y0);

    //Заголовки осей
    var size = 20;
    drawTextXY('X', MIN_X, Y0);
    drawTextXY('-X', MAX_X-size, Y0);

    drawTextXY('Z', X0, MIN_Y+size);
    drawTextXY('-Z', X0, MAX_Y);

    drawTextXY('Y', MAX_X-size, MAX_Y-size);
    drawTextXY('-Y', MIN_X+size, MIN_Y+size);
}

/** TODO */
function logPoint(point, name) {
    //console.log(name + '(', point.x, ',', + point.y, ')');
    console.log(name + ':', point);
}
