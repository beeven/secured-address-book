Secured Address Book
====================

An address book website requiring a client certificate to access.


## Generate certificates

Generate CA key
```
    openssl genrsa -des3 -out privkey.pem 2048
    openssl req -new -x509 -key privkey.pem -out ca.crt -days 1095
```
or

    openssl req -new -newkey rsa:2048 -nodes -out ca.csr -keyout privkey.pem
    openssl x509 -signkey privkey.pem -days 1095 -req -in ca.csr -out ca.crt

Generate Server key and sign it with CA

    openssl req -newkey rsa:2048 -nodes -out server.csr -keyout server.key
    openssl x509 -CA ca.crt -CAkey ca.key -req -in server.csr -out server.crt -days 1095 -set_serial 01

Generate Client key and sign it with CA

    openssl req -newkey rsa:2048 -nodes -out client.csr -keyout client.key
    openssl x509 -CA ca.crt -CAkey ca.key -req -in client.csr -out client.crt -days 1095 -set_serial 11

Export client key and certificate to pfx package

    openssl pkcs12 -export -inkey client.key -in client.crt -out client.pfx


