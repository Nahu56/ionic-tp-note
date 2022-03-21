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
    
    this.position = [{
      latitude: coordinates.coords.latitude, 
      longitude: coordinates.coords.longitude,
      date: this.myDate
    }]

    console.log(this.position);
  }

}
