const express = require('express');
const { api } = require('./config');

// Import middlewares
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./network/routes');
const cors = require('cors');


require('./db')

const app = express()
const server = require('http').createServer(app)

const host = api.host;
const port = api.port;

//socketio
const io = require('socket.io')(server, {cors: {origin: '*'}})

io.on('connection', (socket) => {
  console.log('User Connected ' + socket.id);
});

// Config middlewares
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors());
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });

  // Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

routes(app);
io.on('connection', (socket) => {
  console.log('new connection '+ socket.id)
})

module.exports = server;

