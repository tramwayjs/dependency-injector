const assert = require('assert');

describe('A simple synchronous test', function(){
    it("Using indexOf, 4 should not exist in the array [1,2,3]", function(){
        assert.equal(-1, [1,2,3].indexOf(4));
    });
});

describe('A simple asynchronous test', function(){
    describe('A walk through of possible success scenario tests', function(){
        let asyncFunc = function(cb){
            return cb(null, true);
        };

        it('should complete successfully', function(done){
            asyncFunc(done);
        });

        it('should return true', function(done){
            asyncFunc(function(err, res){
                if (err) return done(err);
                assert.equal(res, true);
                done();
            });
        });

        it('should return a boolean using the type declaration', function(done){
            asyncFunc(function(err, res){
                if (err) return done(err);
                assert.ok(typeof res === "boolean");
                done();
            });
        });

         it('should return a boolean using strict equal', function(done){
            asyncFunc(function(err, res){
                if (err) return done(err);
                assert.strictEqual(typeof res, "boolean");
                done();
            });
        });
    });

    describe('A walk through of possible success scenario tests', function(){
        let asyncFunc = function(cb){
            return cb(new Error("This doesn't work"));
        };

        it('should complete unsuccessfully', function(done){
            asyncFunc(function(err, res){
                if(err) return done();
                done(err);
            });
        });

        it("should return an instance of Error", function(done){
            asyncFunc(function(err, res){
                assert.ok(err instanceof Error);
                done();
            });
        });

        it("should have error message: This doesn't work", function(done){
            asyncFunc(function(err, res){
                assert.strictEqual(err.message, "This doesn't work")
                done();
            });
        });
    });
});