import { Socket, Server as SocketServer } from 'socket.io';
import { Request, Response, Application } from 'express';
import { Server as HttpServer } from 'http';

const app: Application = require('express')();
const server: HttpServer = require('http').createServer(app);
const io: SocketServer = new SocketServer(server, {});
const PORT: Number = 3000;

app.get('/', function (req: Request, res: Response) {
    res.status(200).send({ status: 200 });
});  

io.on('connection', (socket: Socket) => {
    console.log('User has connected', socket.client.conn);
    socket.on('disconnect', (data: any) => {
        console.log('User has disconnected', data);
    });
});

console.log("Server listening on port", PORT);
server.listen(PORT);
