// const express = require('express');
// const app = express();
const webSocketsServerPORT = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPORT)
console.log(`🕸 listening on port ${webSocketsServerPORT}`);

const wsServer = new webSocketServer({ httpServer: server });
const clients = {};

const getUniqueID = () => {
    const s4 = () => {
       return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      
    };
    return s4() +"_"+ s4()
};

wsServer.on('request',(request) => {
    // console.log('request', request)
    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('userID', userID)

    connection.on(`message`, (message) => {
        console.log(`message`, message)
        switch (message.type) {
            case 'utf8':
                    const data = JSON.parse(message.utf8Data)
                    const { type, username, meta , room} = data
                    console.log(`meta`, meta)
                    if (type === 'command') {
                        console.log(`data`, data)
                        console.log(`room`, room)
                        console.log(`username`, username)
                        console.log(`start new game`)
                    }
                for (key in clients) {
                    clients[key].sendUTF(data);
                    // console.log('sent Message to', clients[key]);
                }
                break;
            case 'id':
                break;
                default:
                    return
        }
    });
});

//

wsServer.on('connection', (connection)=>{

})

