import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { AppService } from "./app.service";


@Injectable({
    providedIn:'root'
})

export class FavoritesService extends ObservableStore<{}>{

    constructor(protected _service: AppService) {
        super({trackStateHistory: true});
    
      }
    

    add(fav){
        const state = this.getState() || {};
        this._service.getCurrentConditions(fav.Key).subscribe(data=>{
            state[fav.Key]={
                name : fav.LocalizedName+" ,"+ fav.Country.LocalizedName,
                date :data[0].LocalObservationDateTime,
                temperature: data[0].Temperature.Metric.Value,
            };
            console.log(state);
            this.setState(state,'add_fav');
        },error=>{
            console.log(error);
        });

    }

    remove(fav) {
        const state = this.getState() || {};
        delete state[fav.Key];
        console.log(state)
        this.setState(state,'remove_fav');
        console.log(this.getState() || {});
       }

      get() {
        return this.getState() || {};
      }

    // constructor(private _service : AppService){
    //     super({trackStateHistory: true});
    // }
}
