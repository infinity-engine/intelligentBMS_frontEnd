import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent {
 constructor(private router:Router,private location:Location){
  //console.log(router.routerState.snapshot.url)
  if(window.location.hostname != 'localhost'){
    this.location.replaceState('./');//on prod
  }
 }
}
