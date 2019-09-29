import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-process-trip',
  templateUrl: './process-trip.page.html',
  styleUrls: ['./process-trip.page.scss'],
})
export class ProcessTripPage implements OnInit {

  start:any;
  destination:any;
  mapIconClass:any;
  isTripInfoFilled:boolean=false;
  currentLocation:any={
    lat:0,
    lng:0
  };
  constructor(public geoLocation:Geolocation,
    public nativeGeocoder:NativeGeocoder
    ) { }

  ngOnInit() {
  }

  setStart(){
    if(this.start!=""){
      this.mapIconClass="input-map";
    }
    
    this.geoLocation.getCurrentPosition().then((response)=>{
      this.currentLocation.lat=response.coords.latitude;
      this.currentLocation.lng=response.coords.longitude;
    })

    //this.start=
    this.getAddressFromCoords(this.currentLocation.lat,this.currentLocation.lng);
    
  }

  getAddressFromCoords(lat,lng){
    let opts:NativeGeocoderOptions={
      useLocale:true,
      maxResults:1
    }
  
    this.nativeGeocoder.reverseGeocode(lat,lng,opts)
    .then((result:NativeGeocoderReverseResult[])=>{
      console.log(result);
      
    }).catch(err=>{console.log(err);
    })
  
  }
















}
