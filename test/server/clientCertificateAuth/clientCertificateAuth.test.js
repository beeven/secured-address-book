/**
 * Created by beeven on 8/6/14.
 */

var should = require("should");

var clientCertificateAuth = require("../../modules/client-certificate-auth/lib/clientCertificateAuth.js");




describe('clientCertificateAuth',function(){
    it('should be a function taking one argument',function(){
        clientCertificateAuth.should.be.a.Function.and.have.lengthOf(1);
    });
    it('should return a function taking three arguments -- the middleware',function(){
        clientCertificateAuth(function(){}).should.be.a.Function.and.have.lengthOf(3);
    });
});