export default class Animal {

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    static makeSound() {
        console.log('meow');
    }
}