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

/** Инициализация слайдеров (III-октант) */
function initSliders() {
    $('#sliderX').slider({
        range: 'max', min: 0, max: 10, value: 0,
        change: function(event, ui) {
            changeSlider();
        }
    });
    $('#sliderY').slider({
        range: 'max', min: -10, max: 0, value: 0,
        change: function(event, ui) {
            changeSlider();
        }
    });
    $('#sliderZ').slider({
        range: 'max', min: -10, max: 0, value: 0,
        change: function(event, ui) {
            changeSlider();
        }
    });
}

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
    ctx.fillStyle = "#00F"; //TODO подумать над цветом заливки
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

    //Заголовки осей
    var size = 20;
    drawText('X', MIN_X, Y0);
    drawText('-X', MAX_X-size, Y0);

    drawText('Z', X0, MIN_Y+size);
    drawText('-Z', X0, MAX_Y);

    drawText('Y', MAX_X-size, MAX_Y-size);
    drawText('-Y', MIN_X+size, MIN_Y+size);
}
