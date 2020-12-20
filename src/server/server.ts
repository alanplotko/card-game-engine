import { Socket, Server as SocketServer } from 'socket.io';
import { Request, Response, Application } from 'express';
import { Server as HttpServer } from 'http';
import { randomBytes } from 'crypto';
import { UserRegistration } from 'src/app/user-token.service';

// Server setup
const app: Application = require('express')();
const server: HttpServer = require('http').createServer(app);
const io: SocketServer = new SocketServer(server, { transports: ['websocket']});
const PORT: Number = 3000;

// Support JSON body in requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up CORS
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) have issues with 204
};
app.use(cors(corsOptions));

// DB connection setup
const Keyv = require('keyv');
const db = {
    name: process.env.CARD_GAME_ENGINE_DB_NAME,
    url: process.env.CARD_GAME_ENGINE_DB_URL,
    user: process.env.CARD_GAME_ENGINE_DB_USER,
    pass: process.env.CARD_GAME_ENGINE_DB_PASS
};
const users = new Keyv(`mongodb://${db.user}:${db.pass}@${db.url}/${db.name}`, { collection: 'users' });

const generateNewUserToken = async (): Promise<String> => {
    let token = randomBytes(20).toString('hex');
    let profile = await users.get(token);
    let alreadyExists: boolean = profile !== undefined;
    while (alreadyExists) {
        token = randomBytes(20).toString('hex');
        profile = await users.get(token);
        alreadyExists = profile === undefined;
    }
    return token;
}

app.get('/', function (req: Request, res: Response) {
    res.send('<h1>Server OK</h1>');
});

app.get('/api/status', function (req: Request, res: Response) {
    res.status(200).send({ status: 200 });
});

app.post('/api/user/token/register', function (req: Request, res: Response) {
    generateNewUserToken().then(token => {
        const registration: UserRegistration = {
            token: token,
            profile: {
                registeredOn: Date.now()
            }
        };
        users.set(token, registration).then(() => {
            res.status(200).send(registration);
        });
    });
});

app.post('/api/user/token/fetch', function (req: Request, res: Response) {
    const token = req.body?.token;
    if (token === undefined) {
        return res.status(500).send({
            error: 'MISSING_USER_TOKEN',
            message: 'Missing user token, please register anew by visiting the home page.'
        });
    }
    return users.get(token).then((registration: UserRegistration) => {
        if (registration === undefined) {
            return res.status(401).send({
                error: 'UNRECOGNIZED_USER_TOKEN',
                message: 'User token not found, please register anew by visiting the home page.'
            });
        }
        return res.status(200).send(registration);
    });
});

io.on('connection', (socket: Socket) => {
    console.log('User has connected:', socket.id);
    socket.on('disconnect', (data: any) => {
        console.log('User has disconnected:', data);
    });
});

console.log("Server listening on port", PORT);
server.listen(PORT);
