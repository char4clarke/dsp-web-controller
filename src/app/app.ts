import { Component, inject } from '@angular/core';
import { Dsp } from './services/dsp';
import { ChannelStrip } from './components/channel-strip/channel-strip';

@Component({
  selector: 'app-root',
  imports: [ChannelStrip],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  dsp = inject(Dsp);
  connected = this.dsp.connected;
}
