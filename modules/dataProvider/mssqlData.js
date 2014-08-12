
var Q = require("q");
var sql = require("mssql");

var config = {
    user: 'hr_readonly',
    password: 'hr_readonly',
    server: '10.53.1.174',
    database: 'HR_MOBILE',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};





var connection = new sql.Connection(config);
connection.connect();

exports.getDepartments = function(){
    var deferred = Q.defer();
    var ps = new sql.PreparedStatement(connection);
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
