import {Controller} from 'tramway-core';
import TestModel from '../models/TestModel';
import TestEntity from '../entities/TestEntity';

/**
 * @class MainController
 * @extends {Controller}
 */
export default class MainController extends Controller {
    /**
     * @static
     * @param {Object} req
     * @param {Object} res
     * @memberOf Main
     */
    static index (req, res) {
        let testModel = new TestModel();
        testModel.getAll(function(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send(result);
        });
    }

    static get (req, res) {
        let testModel = new TestModel((new TestEntity()).setId(req.params.id));
        testModel.get(function(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send(result);
        });
    }

    static create(req, res) {
        let testModel = new TestModel((new TestEntity).setText("Created"));
        testModel.create(function(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send(result);
        });
    }

    static update(req, res) {
        let testModel = new TestModel((new TestEntity).setId(req.params.id).setText("Updated " + req.params.id));
        testModel.update(function(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send(result);
        });
    }

    static delete(req, res) {
        let testModel = new TestModel((new TestEntity).setId(req.params.id).setText("Deleted " + req.params.id));
        testModel.update(function(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.send(result);
        });
    }
}