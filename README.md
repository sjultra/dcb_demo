Demonstration of a simple Nodejs web server with Duo authentication using WebSDK 3 authentication flow.


# Prerequisites #
* have nodejs installed 
* install pm2 
```
npm install -g pm2
```
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
pm2 start pm2.config.json
```
# To restart #
```
pm2 restart dcb
```