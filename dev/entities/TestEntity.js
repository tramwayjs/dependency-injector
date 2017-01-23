import {Entity} from "tramway-core";

export default class TestEntity extends Entity {
    /**
     * Creates an instance of A.
     * @memberOf A
     */
    constructor(){
        super();
        this.id = null;
        this.text = null;
    }

    /**
     * @param {number} id
     * @returns {TestEntity}
     * 
     * @memberOf TestEntity
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * 
     * @returns {number}
     * 
     * @memberOf TestEntity
     */
    getId() {
        return this.id;
    }

    /**
     * @param {string} value
     * @returns {TestEntity}
     * 
     * @memberOf TestEntity
     */
    setText(value) {
        this.text = value;
        return this;
    }

    /**
     * 
     * @returns {string}
     * 
     * @memberOf TestEntity
     */
    getText() {
        return this.text;
    }
}