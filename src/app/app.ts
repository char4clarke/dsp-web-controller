import { Component, inject } from '@angular/core';
import { Dsp } from './services/dsp';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  dsp = inject(Dsp);

  gain = this.dsp.gain;
  muted = this.dsp.muted;
  connected = this.dsp.connected;
  meterLevel = this.dsp.meterLevel;

  toggleMute() {
    this.dsp.toggleMute();
  }

  onGainChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dsp.setGain(Number(input.value));
  }
}
