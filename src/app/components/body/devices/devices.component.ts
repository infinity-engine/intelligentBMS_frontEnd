import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  animations:[
    trigger('insertRemoveTrigger',[
      transition(':enter', [
        style({ transform: 'translateX(20%)'}),
        animate('100ms', style({ transform: 'translateX(0%)'})),
      ]),
      transition(':leave', [
        animate('100ms', style({ transform: 'translateX(20%)'}))
      ])
    ])
  ]
})
export class DevicesComponent implements OnInit {
  words=["test chambers.","cells.","battery packs."];
  currentWord = 0;
  constructor(private location: Location) {}

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    setInterval(()=>{
      this.currentWord = (this.currentWord+1)%this.words.length;
    },3000)
  }
}
