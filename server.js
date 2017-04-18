/*jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
let numofElem = 2;

const server = http.createServer((req,res) => {
  console.log(req.method);
  //console.log(index.html);

  if( req.url === '/') {
    fs.readFile('./public/index.html', function(err , data) {
    	if(err) {
    		throw new Error (`Cannot find file: 404`);
    	}
    	res.writeHead(200, {
    		'Content-Type': `text/html`,
    	});
      	res.end(data);
    });
  }

  if(req.url === '/css/styles.css'){
    fs.readFile('./public/css/styles.css', function(err, data) {
      res.end(data);
    });
  }

  if(req.url === '/hydrogen.html') {
    fs.readFile('./public/hydrogen.html', function(err, data) {
      res.end(data);
    });
  }

  if(req.url === '/helium.html') {
    fs.readFile('./public/helium.html', function(err, data) {
      console.log(err);
      res.end(data);
    });

  }

  if(req.method === 'POST') {
    if(req.url === '/elements') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', (data) => {
       const convert = queryString.parse(body);
       fs.writeFile(`./public/${convert.elementName}.html`, content(convert.elementName, convert.elementAtomicNumber, convert.elementDescription), function(err){
       	if(err){
       		throw err;
       	}
       	fs.readFile(`./public/index.html`, `utf8`,function(err, data){
       		let dataArray = data.toString().split('\n');
       		console.log(dataArray[11]);
       		//fs.writeFile();
       	});
       	//numofElem ++;
       	console.log(numofElem);
       	res.end();
       });
      });
    }
  }
});

server.listen(3000, () => {
  console.log( 'Server started on port 3000');
});


 function content(elementName, elementAtomicNumber, elementDescription){
    return  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body> 
  <h1>${elementName}</h1>
  <h2>H</h2>
  <h3>${elementAtomicNumber} 2</h3>
  <p>${elementName} is a chemical elementName with symbol He and atomic number ${elementAtomicNumber}. It is ${elementDescription}.</p>
  <p><a href="/">back</a></p>
</body>
</html>`;
  }