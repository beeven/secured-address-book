
var SqliteDataProvider = require("../../modules/dataProvider/sqliteDataProvider");

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
});