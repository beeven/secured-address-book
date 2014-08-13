/**
 * Created by Beeven on 8/13/2014.
 */

var sqlite3 = require("sqlite3");

var Q = require("q");

function SqliteData() {
    this.database = new sqlite3.Database(require("path").join(__dirname, "..", "..", "HRMobile.sqlite"));

}

SqliteData.prototype.getDepartments = function () {
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function () {
        db.all('select * from Departments', [], function (err, results) {

            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
        })
    });
    return deferred.promise;
};

SqliteData.prototype.getDepartmentById = function (deptId) {
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function () {
        db.all('select * from Departments where dept_id = ?', [deptId], function (err, results) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
        })
    });
    return deferred.promise;
};

SqliteData.prototype.getDepartmentTree = function () {
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function () {
        var step = 3;
        var findChildren = function (deptObj) {
            var d = Q.defer();
            var ret = [];
            db.each("select * from Departments where dept_id like ? and length(dept_id) = ?",
                [deptObj.deptId + '%', deptObj.dpetId.length + step],
                function (err, row) {
                    ret.push({
                        name: row['name'],
                        fullname: row['fullname'],
                        id: row['dept_id']
                    });

                },
                function (err) {
                    if (err){
                        d.reject(err);
                        return;
                    }
                    if(ret.length > 0) {
                        Q.all(ret.map(function (dInfo) {
                            return findChildren(dInfo);
                        })).then(function (results) {
                            deptObj.children = results;
                            d.resolve(deptObj);
                        }).fail(function(err){
                            console.error(err,deptObj);
                        })
                    }
                    else {
                        d.resolve(deptObj);
                    }

                }
            );
            return d.promise;
        };
        db.get("select * from Departments where dept_id = '051'",function(err,result){
            return findChildren(result);
        });
    });
    return deferred.promise;
};

module.exports = SqliteData;