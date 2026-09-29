const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('GUI connected');

  socket.on('close', () => {
    console.log('GUI disconnected');
  });
});

console.log('Fake DSP listening on ws://localhost:8080');