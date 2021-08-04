import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FavoritesService } from '../favorites.service';


export const ADD_FAV = `Add To`;
export const REMOVE_FAV = `Remove From`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class HomeComponent implements OnInit {

  city: string = ''
  cityObject: any;
  listCities: string[];
  index: number[] = [0, 1, 2, 3, 4];
  flag: boolean;
  forecasts: any[];
  favState: string ;
  typeTemp:string = "Fahrenheit"

  //function for returning a list of cities
  listCitiesToChoose(value: string) {
    this._service.getAutoComplete(value).subscribe(data => {
        this.listCities = data;
        document.querySelector('.autocomplete').classList.remove('display');
    },error=>{
      console.log(error);
  });
  }
  //function for show the weather of a selected city
  selectCities(value: any) {
    this.city = '';
    this.cityObject = value;
    this.favState = this.getFavState();
    this.listCities = [];
    document.querySelector('.autocomplete').classList.add('display');
    this._service.get5DaysOfForecasts(value.Key).subscribe(data => {
      this.forecasts = data.DailyForecasts;
      console.log(this.forecasts);
      this.flag = true
    },error=>{
      console.log(error);
  })
  }

  //function for return if the city on fav or no
  getFavState() {
    const storeState = this._favService.get();
    return storeState[this.cityObject.Key] ? REMOVE_FAV : ADD_FAV;
  }

  //function for add or remove from fav
  addAndRemoveFavorites() {
    
    this.favState = this.getFavState();
    if (this.favState === ADD_FAV) {
      this._favService.add(this.cityObject);
      this.favState = REMOVE_FAV;
    }
    else {
      this._favService.remove(this.cityObject);
      this.favState = ADD_FAV;
    }
  }

  //function to calc fahrenheit
  calcFahrenheit(c:number){
    return (c*1.8)+32
  }
  //function to change type of temp
  changeTempType(){
    if(this.typeTemp=="Celsius"){
      this.typeTemp = "Fahrenheit";
    }
    else{
      this.typeTemp = "Celsius";
    }
  }

  constructor(private _service: AppService , private _favService:FavoritesService) { }

  ngOnInit(): void {
    //Set the default location by using the Geolocation API.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this._service.getGeoPosition(latitude, longitude).subscribe(data => {
          console.log(data);
          this._service.get5DaysOfForecasts(data.Key).subscribe(data => {
              this.forecasts = data.DailyForecasts;
              this.flag = true
            },error=>{
              console.log(error);
          });
            this._service.getAutoComplete(this.city).subscribe(data=>{
              console.log(data);
              this.cityObject = data[0];
              this.favState = this.getFavState();
            },error=>{
              console.log(error);
          });
            if(this.cityObject == undefined){
              this._service.getAutoComplete('tel aviv').subscribe(data=>{
                console.log(data);
                this.cityObject = data[0];
                this.favState = this.getFavState();
                console.log(this.cityObject)
              },error=>{
                console.log(error);
            });
            }
        },error=>{
          console.log(error);
      });
      });
    } 
    //Set the default location tel aviv.
    else {
      this._service.get5DaysOfForecasts("215854").subscribe(data => {
        this.forecasts = data.DailyForecasts;
        this.flag = true
      },error=>{
        console.log(error);
    });
      this._service.getAutoComplete('tel aviv').subscribe(data=>{
        console.log(data);
        this.cityObject = data[0];
        this.favState = this.getFavState();
      },error=>{
        console.log(error);
    });
    }
    this.favState = this.getFavState();
  }

}
