
var SqliteDataProvider = require("../../modules/dataProvider/sqliteDataProvider");

var util = require('util');

describe("SqliteDataProvider",function(){
    var sqliteDataProvider = new SqliteDataProvider();

    describe("sqliteDataProvider.getDepartments",function(){
        it('should have a function named getDepartments',function(){
            sqliteDataProvider.getDepartments.should.be.a.Function;
        });
        it('should return non-empty data',function(done){
            sqliteDataProvider.getDepartments()
                .then(function(results){
                    results.should.be.an.Array;
                    results.length.should.be.above(0);
                    done();
                })
                .fail(function(err){
                    console.log(err);
                    done();
                });
        });
    });

    describe("sqliteDataProvider.getDepartmentTree",function(){
        it('should have a function named getDeaprtmentTree',function(){
            sqliteDataProvider.getDepartmentTree.should.be.a.Function;
        });
        it('should return a tree',function(done){
            sqliteDataProvider.getDepartmentTree()
                .then(function(root){
                    root.id.should.be.exactly('051');
                    root.children.should.be.an.Array;
                    //console.log(util.inspect(root,{depth: null, colors: true}))
                    done();
                })
                .fail(function(err){
                    console.error(err);
                    false.should.be.ok;
                    done();
                })
        });
    });

    describe("sqliteDataProvider.getDepartmentTree2",function(){
        it('should return a tree',function(done){
            sqliteDataProvider.getDepartmentTree2()
                .then(function(root){
                    root.id.should.be.exactly('051');
                    root.children.should.be.an.Array;
                    //console.log(util.inspect(root,{depth: 6, colors: true}))
                    done();
                })
                .fail(function(err){
                    console.error(err);
                    false.should.be.ok;
                    done();
                })
        });
    });

});