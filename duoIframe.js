/*
   Copyright 2020 SJULTRA, inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
const IFrame = (api_hostname, sig_request, post_action) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Duo Authentication Prompt</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        body {
            text-align: center;
        }

        iframe {
            width: 100%;
            min-width: 304px;
            max-width: 620px;
            height: 330px;
            border: none;
        }
      </style>
    </head>
    <body>
      <h1>Duo Authentication Prompt</h1>
      <iframe id="duo_iframe"
              title="Two-Factor Authentication"
              data-host= ${api_hostname}
              data-sig-request= ${sig_request}
              data-post-action=${post_action}
              >
      </iframe>
      <script src='https://api.duosecurity.com/frame/hosted/Duo-Web-v2.min.js'></script>
    </body>
  </html>`
}

module.exports = IFrame