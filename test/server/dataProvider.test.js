/**
 * Created by Beeven on 8/13/2014.
 */


var dataProvider = require("../../modules/dataProvider");


describe("dataProvider",function(){
    it('should have getDepartments function',function(){
        dataProvider.getDepartments.should.be.a.Function;
        console.dir(dataProvider.getDepartments());
    });

    it('should have function named getDepartmentTree',function(){
        dataProvider.getDepartmentTree.should.be.a.Function;
    });


    describe("dataProvider.getDepartmentTree",function(){
        it('should return a tree',function(done){
            dataProvider.getDepartmentTree()
            .then(function(root){
                    root.id.should.eql("051");
                    root.name.should.eql("广州海关");
                    root.children.should.be.an.Array;
                    root.children.length.should.be.greaterThan(0);
                    done();
            });
        });
    });

});