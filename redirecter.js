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
const redirecter = (url, maxTime) => `<html>
<meta charset="utf-8" />
<head>
  <style>
    button,
    select,
    #logger,
    #algorithmDetails {
      font - family: Helvetica;
    }
    body {
      margin-top: 50vh;
      text-align: center;
    }
    #logger {
      font - size: 18px;
    }
    #toolbar {
      width: 1400px;
      height: 70px;
      max-height: 100px;
      word-wrap: break-word;
    }
    .toolbar-btn {
      margin: 0;
      padding: 0.25rem 1rem;
      border-radius: 0.317rem;
      border: 1px solid;
      border-color: black;
      background-color: white;
      text-decoration: none;
      cursor: pointer;
    }
    /* Remove the dotted outline inside button that is shown on-click */
    .toolbar-btn::-moz-focus-inner {
      border: 0;
    }
    .toolbar-btn:hover {
      background - color: #F5F5F5;
    }
    /* Click visual effect */
    .toolbar-btn:active {
      box - shadow: inset 0 3px 4px hsla(0, 0%, 0%, 0.2);
    }
    text {
      font - size: 8px;
    }
  </style>
</head>
<body>
  <p id="serverRedirect"></p>
  <p>Close this page if you do not wish to be redirected. This page is protected with <a
      href="https://cloud.google.com/iap/">Google's Identity Aware
      Proxy</a>. You will need to sign into Google with an authorized account in order to proceed.</p>
  <p id="redirectNow">Redirect now</p>
</body>
<script>
  document.getElementById("redirectNow").onclick = function () { redirect(${url}) };
  const e = document.getElementById("serverRedirect")
  e.innerHTML = \`Redirecting you to insertURL in <b id="serverRedirectTimer">...</b> seconds\`
  let timerCounter = 0
  setInterval(() => {
    timerCounter = timerCounter + 1
    if (timerCounter <= ${maxTime}) {
      e = document.getElementById("serverRedirectTimer")
      e.innerHTML = \`\${${maxTime} - timerCounter}\`
    } else {
      redirect(${url})
    }
  }, 1000)
  function redirect(url) {
    if (url.substr(4) != "http")
      url = "https://" + url;
    window.location.href = url;
  }
</script>
</html>`
module.exports = redirecter