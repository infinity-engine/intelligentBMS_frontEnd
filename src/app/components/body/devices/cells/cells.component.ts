import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent {
 constructor(private router:Router){
  console.log(router.routerState.snapshot.url)
 }
}
