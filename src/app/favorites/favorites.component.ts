import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class FavoritesComponent implements OnInit {

  listFavorites: any[] = [];

  constructor(private _service: FavoritesService) { }

  ngOnInit(): void {
    //Receiving favorites
    this._service.stateChanged.subscribe(data => {
      if (data != null) {
        Object.keys(data).map((key) => {
          this.listFavorites.push(data[key]);
        });
      }
    },error=>{
      console.log(error);
  })
  }

}
