const http = require('http')
const url = require('url')
const qs = require('querystring')
const duo_web = require('@duosecurity/duo_web')
const clientData = require('./clientProvider')
const addUser = require('./addUser')
const IFrame = require('./duoIframe')
const fs = require('fs')
const path = require('path')
const { data } = require('./data')
const NodeSession = require('node-session');

let ikey, skey, akey, api_hostname

if (fs.existsSync(path.join(__dirname, `./config.local.js`))) {
  ikey = require('./config.local.js').ikey
  skey = require('./config.local.js').skey
  api_hostname = require('./config.local.js').api_hostname
  akey = require('./config.local.js').akey || 'dummy'
  cookieTimer = require('./config.local.js').cookieTimer
} else {
  ikey = require('./config.js').ikey
  skey = require('./config.js').skey
  api_hostname = require('./config.js').api_hostname
  akey = require('./config.js').akey || 'dummy'
  cookieTimer = require('./config.js').cookieTimer
}

if (akey === 'dummy') {
  console.log('Configure the server properly')
  process.exit(1)
}

session = new NodeSession({
  secret: akey,
  driver: 'memory',
  lifetime: cookieTimer * 60 * 1000,
  // 'encrypt': true //due to deprecated module this should be off
});

const post_action = '/'

const serverHandler = (req, res) => {
  let base_url = url.parse(req.url).pathname
  let method = req.method
  if (method === 'GET') {
    const cookie = req.session.get('user');
    let authenticated_username = ''
    if (cookie !== undefined)
      authenticated_username = cookie
    if (authenticated_username === '') {
      let query = url.parse(req.url, true).query
      let { username } = query
      if (username) {
        let sig_request = duo_web.sign_request(ikey, skey, akey, username)
        let duo_frame = IFrame(api_hostname, sig_request, post_action)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(duo_frame)
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(addUser())
      }
    }
    else if (base_url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(clientData(data))
    } else if (base_url.includes('.msi') || base_url.includes('dmg') || base_url.includes('linux') || base_url.includes('macos') || base_url.includes('windows')) {
      fs.readFile(__dirname + `/data` + req.url, function (err, fileData) {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.setHeader('Content-Length', fileData.length);
          res.write(fileData, 'binary');
          res.end();
        }
      })
      console.log(req)
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else if (method === 'POST') {
    if (base_url === post_action) {
      let request_body = ''

      req.on('data', data => {
        request_body += data.toString() // convert Buffer to string
      })
      req.on('end', () => {
        let form_data = qs.parse(request_body)
        let sig_response = form_data.sig_response
        // verifies that the signed response is legitimate
        let authenticated_username = duo_web.verify_response(ikey, skey, akey, sig_response)
        if (authenticated_username) {
          req.session.push('user', authenticated_username);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(clientData(data))
        } else {
          res.writeHead(401).end()
        }
      })
    }
  }
}

/**
 * Creates the server and listens for any POST/GET requests.
 */
const server = http.createServer((req, res) => {
  session.startSession(req, res, function () {
    return serverHandler(req, res)
  })


})

server.listen(8080, '0.0.0.0', () => console.log('Simple app listening on port 8080'))
