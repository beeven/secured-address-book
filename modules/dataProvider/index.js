/**
 * Created by Beeven on 8/12/2014.
 */


var MssqlDataProvider = require("./mssqlDataProvider");

var SqliteDataProvider = require("./sqliteDataProvider");


var dataProviderMap = {
    "mssql" : MssqlDataProvider,
    "sqlite" : SqliteDataProvider
};


function dataProviderFactory(name) {
    var dataProvider = dataProviderMap[name];
    var dp = new dataProvider();
    dp.init();
    return dp;
}

var dataProvider = dataProviderFactory("mssql");


module.exports = dataProvider;