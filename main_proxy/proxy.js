const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

const proxy = httpProxy.createProxyServer({});

// Define the paths to your SSL certificate and private key
const sslKeyPath = './divyahouse.com_privatekey.key';
const sslCertPath = './divyahouse.com_csr.csr';

const proxyServer = https.createServer({
  key: fs.readFileSync(sslKeyPath),   // Your SSL private key
  cert: fs.readFileSync(sslCertPath), // Your SSL certificate
}, (req, res) => {
  // Proxy HTTP request
  proxy.web(req, res, {
    target: 'https://google.com', // Target URL to proxy to
    secure: false, // Set to 'true' if the target URL is using HTTPS
  });
});

// HTTP server for redirecting HTTP to HTTPS
const httpRedirectServer = http.createServer((req, res) => {
  const httpsPort = 443; // Port of your HTTPS server

  // Redirect to HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}:${httpsPort}${req.url}` });
  res.end();
});

// Start the HTTP server for redirection
httpRedirectServer.listen(80, () => {
  console.log('HTTP redirection server is running on port 80');
});

// Start the HTTPS proxy server
proxyServer.listen(443, () => {
  console.log('Proxy server is running on port 443');
});
