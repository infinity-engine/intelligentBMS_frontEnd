import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-devices-default',
  templateUrl: './devices-default.component.html',
  styleUrls: ['./devices-default.component.css'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ transform: 'translateY(40%)' }),
        animate('100ms', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('0ms', style({ transform: 'translateY(-20%)' })),
      ]),
    ]),
  ],
})
export class DevicesDefaultComponent {
  words = ['test chambers.', 'cells.', 'battery packs.'];
  currentWord = 0;
  constructor(private location: Location) {}

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    setInterval(() => {
      this.currentWord = (this.currentWord + 1) % this.words.length;
    }, 1500);
  }
}
