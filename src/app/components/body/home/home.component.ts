import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';


class Dot {
  // Initialize the dot: connect sprite and track properties with supplied SVG elements
  constructor(public sprite:any, public track:any) {
      this.sprite = document.getElementById(sprite);
      this.track = document.getElementById(track);
  }
  
  // Put the dot on its spot
  move(u:any) {
      let p = this.track.getPointAtLength(u * this.track.getTotalLength());
      this.sprite.setAttribute("transform", `translate(${p.x}, ${p.y})`);
  }
}
class Anim {
  public duration:any;
  public tZero:any;

  constructor(public dot:any){
    this.dot = dot;
  }
  start(duration:any) {
      this.duration = duration;
      this.tZero = Date.now();
      requestAnimationFrame(() => this.run());
  }
  
  run(){
      let u = Math.min((Date.now() - this.tZero) / this.duration, 1);
      
      if (u < 1) {
          // Keep requesting frames, till animation is ready
          requestAnimationFrame(() => this.run());
      } else {
          this.onFinish();
      }
      
      this.dot.move(u);
  }
  
  onFinish() {
      // Schedule the animation to restart
      setTimeout(() => this.start(this.duration), 10);
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
    let anim_time = 4000;
    let dot1 = new Dot('Dot_1','Path_1');
    let anim_gen_1 = new Anim(dot1);
    anim_gen_1.start(anim_time);

    let dot2 = new Dot('Dot_2','Path_2');
    let anim_gen_2 = new Anim(dot2);
    anim_gen_2.start(anim_time);

    let dot3 = new Dot('Dot_3','Path_3');
    let anim_gen_3 = new Anim(dot3);
    anim_gen_3.start(anim_time);

    let dot4 = new Dot('Dot_4','Path_4');
    let anim_gen_4 = new Anim(dot4);
    anim_gen_4.start(anim_time);

    //change the location from /home to home just to keep the location static through out the app
    this.location.replaceState('./')
  }

}
