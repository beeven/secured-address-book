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
                [deptObj.id + '%', deptObj.id.length + step],
                function (err, row) {
                    if(err) {
                        console.error(err);
                        d.reject(err);
                        return;
                    }
                    ret.push({
                        name: row['DEPT_LVL3'] || row['DEPT_LVL2'] || row['DEPT_LVL1'],
                        fullname: row['full_name'],
                        id: row['dept_id']
                    });

                },
                function (err) {
                    if (err){
                        console.error(err);
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
                            d.reject(err);
                        })
                    }
                    else {
                        d.resolve(deptObj);
                    }

                }
            );
            return d.promise;
        };
        db.get("select * from Departments where dept_id = '051'",function(err,row){
            findChildren({
                id: row['dept_id'],
                name: row['DEPT_LVL3'] || row['DEPT_LVL2'] || row['DEPT_LVL1'],
                fullname: row['full_name']
            })
                .then(function(ret){
                    deferred.resolve(ret);

                },function(err){
                    deferred.reject(err);
                });
        });
    });
    return deferred.promise;
};

SqliteData.prototype.getDepartmentTree2 = function() {
    var deferred = Q.defer();
    var db = this.database;
    db.serialize(function(){

        db.all("select * from Departments",function(err,results){
            var findChildren = function(deptObj) {
                var patt = new RegExp("^"+deptObj.id + ".{3}$");
                //console.log('staring at: ',deptObj);
                var filtered = results.filter(function(row){
                    return patt.test(row['dept_id']);
                });
                //console.log('filtered: ',filtered.length);
                if(filtered.length > 0) {
                    var children = [];
                    for(var i=0;i<filtered.length;i++) {
                        var ret = {
                            name: filtered[i]['DEPT_LVL3'] || filtered[i]['DEPT_LVL2'] || filtered[i]['DEPT_LVL1'],
                            fullname: filtered[i]['full_name'],
                            id: filtered[i]['dept_id']
                        };
                        results.splice(results.indexOf(filtered[i]),1);
                        var grandchildren =  findChildren(ret);
                        if(grandchildren != null && typeof(grandchildren) !== 'undefined') {
                            //console.log(grandchildren);
                            ret.children = grandchildren;
                        }
                        children.push(ret);
                    }
                    return children;
                }
            };

            var min = results.reduce(function(minObj,row,index){
                if(minObj.length > row['dept_id'].length) {
                    return {
                        length: row['dept_id'].length,
                        index: index
                    };
                } else {
                    return minObj;
                }
            },{length:results[0]['dept_id'].length,index:0});

            var root = {
                id: results[min.index]['dept_id'],
                name : results[min.index]['DEPT_LVL3'] || results[min.index]['DEPT_LVL2'] || results[min.index]['DEPT_LVL1'],
                fullname: results[min.index]['full_name']
            };
            results.splice(min.index,1);
            root.children = findChildren(root);
            deferred.resolve(root);
        });
    });


    return deferred.promise;
};

module.exports = SqliteData;