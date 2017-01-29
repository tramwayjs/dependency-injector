export default class RandomClass {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    setC(c) {
        this.c = c;
        return this;
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    getC() {
        return this.c;
    }
}