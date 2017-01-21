/**
 * @property {Animal} animal
 */
export default class Vet {

    /**
     *
     * @param {Animal} Animal
     */
    constructor(Animal) {
        this.animal = Animal;

        console.log('Vet got:', Animal);
        console.log(`It\'s name is: ${Animal.name}`);
        Animal.makeSound()
    }
}