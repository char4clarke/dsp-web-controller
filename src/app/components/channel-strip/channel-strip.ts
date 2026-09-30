import { Component, inject, input } from '@angular/core';
import { Dsp } from '../../services/dsp';

@Component({
  imports: [],
  selector: 'app-channel-strip',
  styleUrl: './channel-strip.scss',
  templateUrl: './channel-strip.html',
})
export class ChannelStrip {
  dsp = inject(Dsp);

  channelNumber = input('CH 01');
  channelName = input('Input 1');

  gain = this.dsp.gain;
  muted = this.dsp.muted;
  meterLevel = this.dsp.meterLevel;

  toggleMute() {
    this.dsp.toggleMute();
  }

  onGainChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dsp.setGain(Number(input.value));
  }
}
