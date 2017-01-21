export default class Animal {

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        console.log('meow');
    }
}