class Area {
    calc() {
        return {
            area: this.calcArea(),
            figure: this.figure,
            input: this.input
        };
    }

    calcArea() {
    }
}

class AreaSquare extends Area {
    constructor(a) {
        super();
        this.figure = 'square';
        this.input = {a: a};
    }

    calcArea() {
        return Math.pow(this.input.a, 2);
    }
}

class AreaRectangle extends Area {
    constructor(a, b) {
        super();
        this.figure = 'rectangle';
        this.input = {a: a, b: b};
    }

    calcArea() {
        return this.input.a * this.input.b;
    }
}

class AreaTriangle extends Area {
    constructor(a, b, c) {
        super();
        this.figure = 'triangle';
        this.input = {a: a, b: b, c: c};
    }

    calcPerimeter() {
        return (this.input.a + this.input.b + this.input.c) / 2;
    }

    calcArea() {
        let s = this.calcPerimeter();
        return Math.sqrt(
            s * (s - this.input.a) * (s - this.input.b) * (s - this.input.c)
        );
    }
}

function calculateArea() {
    let args = arguments;
    let argsLen = arguments.length;
    switch (argsLen) {
        case 1:
            let square = new AreaSquare(args[0]);
            return square.calc();
            break;
        case 2:
            let rectangle = new AreaRectangle(args[0], args[1]);
            return rectangle.calc();
            break;
        case 3:
            let triangle = new AreaTriangle(args[0], args[1], args[2]);
            return triangle.calc();
            break;
        default:
            return null;
    }
}