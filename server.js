/*jshint esversion: 6*/

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
	//console.log(req.method);
	console.log(req.url);
	//console.log(req.headers.body);

	if(req.url === '/'){
		fs.readFile('./public/index.html', function(err, data){
			res.end(data);
		});
	}

	// res.writeHead(200);
	// res.end('WAZZZAAAAP!');
});

server.listen(3000, ()=> {
	console.log("server initiated!");
});