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

  toggleMute() {
    this.muted.set(!this.muted());
  }
}