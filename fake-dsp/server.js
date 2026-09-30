const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

let deviceState = {
  gain: -3,
  muted: false,
};

wss.on('connection', (socket) => {
  console.log('GUI connected');

  socket.send(
    JSON.stringify({
      type: 'deviceState',
      gain: deviceState.gain,
      muted: deviceState.muted,
    }),
  );

  let meterLevel = -30;
  const meterInterval = setInterval(() => {
    const targetLevel = -30 + Math.random() * 18;

    meterLevel += (targetLevel - meterLevel) * 0.3;

    socket.send(
      JSON.stringify({
        type: 'meter',
        level: meterLevel,
      }),
    );
  }, 100);

  socket.on('message', (data) => {
    const message = JSON.parse(data.toString());

    console.log('Message from GUI:', message);

    if (message.type === 'setGain') {
      deviceState.gain = message.value;

      socket.send(
        JSON.stringify({
          type: 'deviceState',
          gain: deviceState.gain,
          muted: deviceState.muted,
        }),
      );
    }

    if (message.type === 'setMute') {
      deviceState.muted = message.value;

      socket.send(
        JSON.stringify({
          type: 'deviceState',
          gain: deviceState.gain,
          muted: deviceState.muted,
        }),
      );
    }
  });

  socket.on('close', () => {
    console.log('GUI disconnected');
    clearInterval(meterInterval);
  });
});

console.log('Fake DSP listening on ws://localhost:8080');
