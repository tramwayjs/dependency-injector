import {Model} from 'tramway-core';
import ExampleAPIWrapperConnection from '../connections/ExampleAPIWrapperConnection';
import TestEntity from '../entities/TestEntity';

export default class TestModel extends Model {

    /**
     * Creates an instance of TestModel.
     * 
     * @param {TestEntity} item
     * 
     * @memberOf TestModel
     */
    constructor(item) {
        if (!item || !item instanceof TestEntity) {
            item = new TestEntity();
        }
        super(new ExampleAPIWrapperConnection(), item);
    }

    /**
     * @returns {Number} id
     * 
     * @memberOf TestModel
     */
    getId() {
        return this.entity.getId();
    }

    /**
     * @param {Number} id
     * @returns {Model}
     * 
     * @memberOf TestModel
     */
    setId(id) {
        this.entity.setId(id);
        return this;
    }
}