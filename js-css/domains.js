'use strict';

/**
 * Класс: Точка
 */
function Point(drawing, x, y, x3D, y3D, z3D) {
    this.x = x;
    this.y = y;

    this.x3D = x3D;
    this.y3D = y3D;
    this.z3D = z3D;

    /** Рисование точки */
    this.drawPoint = function(pointName, color) {
        drawing.drawCircle(this.x, this.y, 5, color);
        if (pointName) this.drawText(pointName, color);

        return this;
    };
    /** Рисование текста */
    this.drawText = function (text, color) {
        drawing.drawTextXY(text, this.x, this.y, color);

        return this;
    };
    /** Рисование линии */
    this.drawLine = function (pointTo, color) {
        drawing.drawLineXY(this.x, this.y, pointTo.x, pointTo.y, color);

        return this;
    };
}

/**
 * Класс: Drawing
 */
function Drawing(canvas, type) {
    var ALPHA = 45;
    var _self = this;

    /** Создание 3D точки */
    this.createPoint3D = function(x3D, y3D, z3D) {
        var x = getX(x3D, y3D);
        var y = getY(z3D, y3D);

        return new Point(this, x, y, x3D, y3D, z3D);
    };

    /** Создание 2D точки */
    this.createPoint2D = function(x2D, y2D) {
        var x = getX(x2D, 0);
        var y = getY(y2D, 0);

        return new Point(this, x, y);
    };

    /** X - координата в 2D */
    function getX(x3D, y3D) {
        var v1 = X0 - (x3D - Math.round(y3D * Math.cos(ALPHA))) * SCALE; //Криво по Y
        var v2 = X0 - Math.round((x3D - y3D * Math.cos(ALPHA)) * SCALE); //Нормально по Y

        return v2;
    }
    /** Y - координата в 2D */
    function getY(z3D, y3D) {
        var v1 = Y0 - (z3D - Math.round(y3D * Math.sin(ALPHA))) * SCALE;
        var v2 = Y0 - Math.round((z3D - y3D * Math.sin(ALPHA)) * SCALE);

        return v2;
    }

    /** Рисование текста */
    this.drawTextXY = function(text, x, y, color) {
        canvas.fillStyle = color ? color : COLOR_TEXT;
        canvas.font = 'normal 15pt Arial';
        canvas.fillText(text, x, y);
    };

    /** Рисование линии */
    this.drawLineXY = function(x1, y1, x2, y2, color) {
        canvas.beginPath();
        canvas.moveTo(x1, y1);
        canvas.lineTo(x2, y2);
        canvas.lineWidth = 2;
        canvas.strokeStyle = color ? color : COLOR_LINE;
        canvas.stroke();
    };

    /** Рисование окружности */
    this.drawCircle = function(x, y, radius, color) {
        canvas.fillStyle = color ? color : COLOR_POINT;
        canvas.beginPath();
        canvas.arc(x, y, radius, 0, Math.PI*2, false);
        canvas.closePath();
        canvas.fill();
    };

    /** Очистка канвы */
    this.clearCanvas = function() {
        canvas.clearRect(MIN_X, MIN_Y, MAX_X, MAX_Y);
    };

    /** Построение осей координат */
    this.drawAxis = function() {
        this.clearCanvas();

        //Рисование осей
        if (type == 'dim') {
            var y1 = this.createPoint3D(0, -100, 0);
            var y2 = this.createPoint3D(0, 100, 0);
            y1.drawLine(y2, COLOR_AXIS);
        }
        this.drawLineXY(X0, MIN_Y, X0, MAX_Y, COLOR_AXIS);
        this.drawLineXY(MIN_X, Y0, MAX_X, Y0, COLOR_AXIS);

        //Заголовки осей
        var size = 30;
        var titles = {
            dim: [{title: 'X', x: MIN_X, y: Y0}, {title: '-X', x: MAX_X-size, y: Y0},
                {title: 'Z', x: X0, y: MIN_Y+size}, {title: '-Z', x: X0, y: MAX_Y-size},
                {title: 'Y', x: MAX_X-size*3, y: MAX_Y-size}, {title: '-Y', x: MIN_X+size*2, y: MIN_Y+size}],
            cmplx: [{title: 'X', x: MIN_X, y: Y0}, {title: 'Y1', x: MAX_X-size, y: Y0},
                {title: 'Z', x: X0, y: MIN_Y+size}, {title: 'Y', x: X0, y: MAX_Y-size}]
        };

        $.each(titles[type], function(index, value) {
            _self.drawTextXY(value.title, value.x, value.y, COLOR_AXIS_TITLE);
        });
    };

}
