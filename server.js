const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})


var global="https://okberry.onrender.com/"

server.use(cors({
  credentials:true,
  origin:[global]
}));

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})

server.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname ,'index.html'))
})
