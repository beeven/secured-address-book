/**
 * Created by Beeven on 8/12/2014.
 */

var DataProvider = require("../../modules/dataProvider/index");

describe("dataProvider",function(){
    var dataProvider = new DataProvider();

    describe("dataProvider.getDepartments",function(){
        it('should have a function named getDepartments',function(){
            dataProvider.getDepartments.should.be.a.Function;
        });
        it('should return non-empty data',function(done){
            dataProvider.getDepartments().then(function(results){
                results.should.be.an.Array;
                console.log(results);
                done();
            });
        });
    });
});