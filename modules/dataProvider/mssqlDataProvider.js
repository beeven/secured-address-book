/**
 * Created by Beeven on 8/12/2014.
 */




var Q = require("q");
var sql = require("mssql");

var config = {
    user: 'HRMobileAdmin',
    password: 'HRMobileAdmin',
    server: '10.53.1.174',
    database: 'HR_MOBILE',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};


function MSSQLData() {
    this.initialized = false;
    this.initDeferred = Q.defer();
}

MSSQLData.prototype.init = function() {
    if(this.initialized === false) {
        //console.log("invoking init");
        this.initialized = 'initializing';
        var that = this;
        this.connection = new sql.Connection(config,function(err){
            if(err) that.initDeferred.reject(err);

            that.initialized = true;
            that.initDeferred.resolve(that);
            //console.log("connected");
        });
    }
    return this.initDeferred.promise;
};

MSSQLData.prototype.getDepartments = function(){
    //console.log("invoking getDepartment");
    if(this.initialized !== true) {
        return this.init().invoke("getDepartments");
    }
    var deferred = Q.defer();
    var ps = new sql.PreparedStatement(this.connection);
    ps.prepare("select * from Departments",function(err){
        if(err) {
            deferred.reject(err);
            return;
        }
        ps.execute({},function(err,results) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
            ps.unprepare(function (err) {
                if (err) throw err;
            });
        });
    });
    return deferred.promise;
};

MSSQLData.prototype.getDepartmentById = function(deptId) {
    if(this.initialized !== true) {
        return this.init().invoke("getDepartments");
    }
    var deferred = Q.defer();
    var ps = new sql.PreparedStatement(this.connection);
    ps.input('@Id',sql.Nvarchar(18));
    ps.prepare("select * from Departments where dept_id = @Id",function(err){
        if(err) {
            deferred.reject(err);
            return;
        }
        ps.execute({Id:deptId},function(err,results) {
            if(err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(results);
            ps.unprepare(function(err){
                throw err;
            })
        });
    })
};

module.exports = MSSQLData;

