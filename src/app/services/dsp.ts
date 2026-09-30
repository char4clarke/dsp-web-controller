import { Service, signal } from '@angular/core';

@Service()
export class Dsp {
    gain = signal(-3);
    muted = signal(false);
    connected = signal(false);
    meterLevel = signal(-60);

    socket = new WebSocket('ws://localhost:8080');

    constructor() {
    this.socket.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
      this.connected.set(true);
    });

    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.type !== 'meter') {
        console.log('Message from DSP:', message);
      }

      if (message.type === 'deviceState') {
        this.gain.set(message.gain);
        this.muted.set(message.muted);
      }

      if (message.type === 'meter') {
        this.meterLevel.set(message.level);
      }
    });

    this.socket.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      this.connected.set(false);
    });
  }

  toggleMute() {
    this.socket.send(
      JSON.stringify({
        type: 'setMute',
        value: !this.muted(),
      }),
    );
  }

  setGain(value: number) {
    this.socket.send(
      JSON.stringify({
        type: 'setGain',
        value: value,
      }),
    );
  }
}
