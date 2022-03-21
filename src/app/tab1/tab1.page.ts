import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Network } from '@capacitor/network';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  public position:Array<{latitude: number, longitude: number, date: Date}> = [];
  myDate = new Date();

  ngOnInit(){
    this.displayConnection();

    this.getPosition();
  }

  async displayConnection(){
    const status = await Network.getStatus();

    await Toast.show({
      text: "Connecté en "+ status.connectionType,
    });
  }

  async getPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    // const coordinates = await Geolocation.watchPosition(success, error, options);   ->  C'est watchPosition qu'il faut utiliser pour avoir un tracking  
    
    this.position = [{
      latitude: coordinates.coords.latitude, 
      longitude: coordinates.coords.longitude,
      date: this.myDate
    }]
  }

  /* -------------------------------------------------------------------------- */
  /*                        fonctions pour watchPosition                        */
  /* -------------------------------------------------------------------------- */

  // var id, target, options;

  // function success(pos) {
  //   var crd = pos.coords;

  //   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
  //     console.log('Bravo, vous avez atteint la cible');
  //     navigator.geolocation.clearWatch(id);
  //   }
  // }

  // function error(err) {
  //   console.warn('ERROR(' + err.code + '): ' + err.message);
  // }

  // target = {
  //   latitude : 0,
  //   longitude: 0
  // };

  // options = {
  //   enableHighAccuracy: false,
  //   timeout: 5000,
  //   maximumAge: 0
  // };

}
