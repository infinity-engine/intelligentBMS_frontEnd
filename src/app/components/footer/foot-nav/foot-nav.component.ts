import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foot-nav',
  templateUrl: './foot-nav.component.html',
  styleUrls: ['./foot-nav.component.css'],
})
export class FootNavComponent implements OnInit {
  developer = {
    image: 'https://github.com/infinity-engine.png',
    url: 'https://github.com/infinity-engine',
    role: 'Developer',
    name: 'Koushik Samanta',
  };
  constructor() {}

  ngOnInit(): void {
  }
}
