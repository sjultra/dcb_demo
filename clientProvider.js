const provider = (data) => `<html>
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

    /* Adapted from https://codepen.io/cbracco/pen/ywdbm */
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
    <span>You are using:<b>
      <div id="OS" style="display: inline;"></div>
    </b> </span>
    <br />
    <span> With local date:<b>
      <div id="Date" style="display: inline;"></div>
    </b> </span>
    <br />
    <br />
    <br />
    <span>Version fit for your OS:</span>
    <a id="Download" style="display: inline;">Download</a>
    <br />
    <br />
    <br />
    <br />
    <span>Alternatives:</span>
    <ul id="alternatives"></ul>

  </body>
  <script>
  const binaries = ${JSON.stringify(data)}
  const getOS = () => {
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    os = null;

if (macosPlatforms.indexOf(platform) !== -1) {
  os = 'Mac OS';
} else if (windowsPlatforms.indexOf(platform) !== -1) {
  os = 'Windows';
} else if (!os && /Linux/.test(platform)) {
  os = 'Linux';
}
return {os,platform}
}

  const OS = getOS()
  let e = document.getElementById("OS")
  e.innerHTML = OS.os
  const d = () => new Date().toString()
  e = document.getElementById("Date")
  e.innerHTML = d()
  e = document.getElementById("Download")
  e.href = \`\${window.location.origin}/\${binaries[OS.os][OS.platform]}\`
  e.download = \`\${binaries[os][platform]}\`
  e.target="_blank"
  e = document.getElementById("alternatives")
  e.innerHTML = Object.keys(binaries).map((os)=>{
    return  Object.keys(binaries[os]).map((platform)=>{
      if(platform!==OS.platform)
      return \`\n <li>\${os} \${platform} :
       <a href = \${window.location.origin}/\${binaries[os][platform]} download=\${binaries[os][platform]} target="_blank" >
      Download</a></li>\`
     }).join('')
    }).join('')
  
</script>

</html>`
module.exports = provider