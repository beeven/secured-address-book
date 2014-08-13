/**
 * Created by Beeven on 8/12/2014.
 */

var MSSQLDataProvider = require("../../modules/dataProvider/mssqlDataProvider.js");

describe("dataProvider",function(){
    var mssqlDataProvider = new MSSQLDataProvider();

    describe("mssqlDataProvider.getDepartments",function(){
        it('should have a function named getDepartments',function(){
            mssqlDataProvider.getDepartments.should.be.a.Function;
        });
        it('should return non-empty data',function(done){
            mssqlDataProvider.getDepartments().then(function(results){
                results.should.be.an.Array;
                results.length.should.be.above(0);
                done();
            });
        });
    });
});