import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery-test',
  templateUrl: './battery-test.component.html',
  styleUrls: ['./battery-test.component.css']
})
export class BatteryTestComponent implements OnInit {
  constructor(private location:Location) { }

  ngOnInit(): void {
    if(window.location.hostname != 'localhost'){
      this.location.replaceState('./');//on prod
    }
  }

}
