const http = require('http');
const fs = require('fs');
const path = require('path');
const host = '127.0.0.1';
const port = '9000';
const mimes = {
  ".html" : "text/html",
  ".htm" : "text/html",
  ".css" : "text/css",
  ".js" : "text/javascript",
  ".gif" : "image/gif",
  ".jpg" : "image/jpeg",
  ".jpeg" : "image/jpeg",
  ".png" : "image/png"
}

const server = http.createServer((req, res) => {
  
  const filePath = (req.url === '/') ? ('./web/index.html') : ('./web' + req.url);
  const contentType = mimes[path.extname(filePath)];

  fs.exists(filePath, (file_exists) => {

    if(file_exists){
        res.writeHead(200, {'Content-Type': contentType});
        const streamFile = fs.createReadStream(filePath).pipe(res);

        streamFile.on('error', () => {
          res.writeHead(404);
          res.end();
        });

    }else{

      res.writeHead(404);
      res.end('sorry we could not find the file you requested');
    }
  });
}).listen(port, host, () => {

  console.log('Server running on http://' + host + ':' + port);
});
