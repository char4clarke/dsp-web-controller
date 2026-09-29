import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  gain = signal(-3);
  muted = signal(false);
  connected = signal(false);

  constructor() {
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
      this.connected.set(true);
    });

    socket.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      this.connected.set(false);
    });
  }

  toggleMute() {
    this.muted.set(!this.muted());
  }

  onGainChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.gain.set(Number(input.value));
  }
}
