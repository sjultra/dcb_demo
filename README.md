Demonstration of a simple Nodejs web server with Duo authentication using WebSDK 3 authentication flow.


# Prerequisites #
* save the config file as config.local.js
```
cp config.js config.local.js
```
* generate a private key  for `akey`

```
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 40 ; echo ''
```

* configure locally the application by populating config.local.js

# Run The Example: #
To run the server on port 8080:
```
node server.js
```
