/**
 * Created by Beeven on 8/13/2014.
 */

var sqlite3 = require("sqlite3");

var Q = require("q");

function SqliteData() {
    this.database = new sqlite3.Database(require("path").join(__dirname,"..","..","HRMobile.sqlite"));

}

SqliteData.prototype.getDepartments = function(){
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function(){
        db.all('select * from Departments',[],function(err,results){

            if(err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
        })
    });
    return deferred.promise;
};

SqliteData.prototype.getDepartmentById = function(deptId) {
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function(){
        db.all('select * from Departments where dept_id = ?',[deptId],function(err,results){
            if(err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
        })
    });
    return deferred.promise;
};

module.exports = SqliteData;