/**
 * Created by beeven on 8/6/14.
 */

require("must");

var clientCertificateAuth = require("../lib/clientCertificateAuth.js");




describe('clientCertificateAuth',function(){
    it('must be a function taking one argument',function(){
        clientCertificateAuth.must.be.a.function();
    });
    it('should return a function taking three arguments -- the middleware',function(){
        clientCertificateAuth(function(){}).must.be.a.function().and.have.lengthOf(3);
    });
});