import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent {
  title = 'weather';
  mode:string = "dark";

  switchMode(){
    if(this.mode == "dark"){
      document.querySelector('body').style.backgroundImage='url(./assets/dark.jpg)';
      this.mode ="light";
    } else {
      document.querySelector('body').style.backgroundImage='url(./assets/light.jpg)';
      this.mode = "dark";
    }
  }
}
