const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../dist/index.js');
var describeCoreClass = utils.describeCoreClass;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper instance of DependencyResolver", function(){
        let instance = lib.DependencyResolver;
        it("Should return an instance of DependencyResolver", function(){
            assert.strictEqual(instance.constructor.name, "DependencyResolver");
        });
    });

    describe("Should return an object for errors.", function(){
        it("Should return an object for errors.", function(){
            assert.strictEqual(typeof lib.errors, "object");
        });

        it("There should be the same errors as in the previous version", function(){
            assert.deepEqual(Object.keys(lib.errors), ["ServiceNotFoundError"]);
        });

        describe("Should return a proper 'ServiceNotFoundError' class", describeCoreClass(
            lib.errors.ServiceNotFoundError, 
            "ServiceNotFoundError", 
            [],
            []     
        ));
    });
    describe("Should return an object for container.", function(){
        it("Should return an object for container.", function(){
            assert.strictEqual(typeof lib.container, "object");
        });

        it("There should the same number of container types as the previous version", function(){
            assert.deepEqual(Object.keys(lib.container), ["Container", "ContainerManager"]);
        });

        describe("Should return a consistent 'Container' class.", describeCoreClass(
            lib.container.Container, 
            "Container",
            [],
            ['buildMap', 'set', 'get']
        ));
        describe("Should return a consistent 'ContainerManager' class.", describeCoreClass(
            lib.container.ContainerManager, 
            "ContainerManager",
            [],
            ['get', 'initialize']
        ));
    });
    describe("Should return an object for dependencies.", function(){
        it("Should return an object for dependencies.", function(){
            assert.strictEqual(typeof lib.dependencies, "object");
        });

        it("There should the same number of dependencies types as the previous version", function(){
            assert.deepEqual(Object.keys(lib.dependencies), ["DependencyInjector", "DependencyManager", "ParametersManager", "ServicesManager"]);
        });

        describe("Should return a proper 'DependencyInjector' class", describeCoreClass(
            lib.dependencies.DependencyInjector, 
            "DependencyInjector", 
            [],
            ["injectParameters", "isInjectableCriteria", "injectParameter", "injectService"]
        ));
        describe("Should return a proper 'DependencyManager' class", describeCoreClass(
            lib.dependencies.DependencyManager, 
            "DependencyManager", 
            [],
            ["create", "initialize", "getService", "getParameter", "get"]
        ));
        describe("Should return a proper 'ParametersManager' class", describeCoreClass(
            lib.dependencies.ParametersManager, 
            "ParametersManager", 
            [],
            ["initialize", "get", "getEnv", "unifyConfig", "recursiveUnification"]
        ));
        describe("Should return a proper 'ServicesManager' class", describeCoreClass(
            lib.dependencies.ServicesManager, 
            "ServicesManager", 
            [],
            ["initialize", "prepareServices", "get", "prepareInstance"]
        ));
    });
    describe("Should return an object for util.", function(){
        it("Should return an object for util.", function(){
            assert.strictEqual(typeof lib.util, "object");
        });

        it("There should the same number of util types as the previous version", function(){
            assert.deepEqual(Object.keys(lib.util), ["ClassBuilder", "ClassDefinitionFactory", "MapFactory"]);
        });

        describe("Should return a proper 'ClassBuilder' class", describeCoreClass(
            lib.util.ClassBuilder, 
            "ClassBuilder", 
            [],
            ["prepare"]
        ));
        describe("Should return a proper 'ClassDefinitionFactory' class", describeCoreClass(
            lib.util.ClassDefinitionFactory, 
            "ClassDefinitionFactory", 
            ["create"],
            []
        ));
        describe("Should return a proper 'MapFactory' class", describeCoreClass(
            lib.util.MapFactory, 
            "MapFactory", 
            ["create", "convertToObject"],
            []
        ));
    });
    describe("Should return an object for entities.", function(){
        it("Should return an object for entities.", function(){
            assert.strictEqual(typeof lib.entities, "object");
        });

        it("There should the same number of entities types as the previous version", function(){
            assert.deepEqual(Object.keys(lib.entities), ["ClassDefinition"]);
        });

        describe("Should return a proper 'ClassDefinition' class", describeCoreClass(
            lib.entities.ClassDefinition, 
            "ClassDefinition", 
            [],
            ["getKey", "getClass", "getConstructorArgs", "getFunctionsArgs"]
        ));
    });
});