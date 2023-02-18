import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
    if(window.location.hostname != 'localhost'){
    this.location.replaceState('./');//on prod
    }
  }

}
