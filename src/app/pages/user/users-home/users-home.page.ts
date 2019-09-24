import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage implements OnInit {

  userHomeTitle: String = Constants.USER_HOME_TITLE;

  barcodeScannerOptions: BarcodeScannerOptions; //not needed

  encodedData: any;

  encodedDataText:any;

  constructor(public userService: UserService,
    private barcodeScanner: BarcodeScanner,
    public storage:Storage
    ) {
      this.encodedDataText={}
  }

  ngOnInit() {

   this.storage.get('users').then((value)=>{
     console.log(value.name);
     this.encodedData=JSON.stringify(value);
     this.encodedDataText.name=value.name;
     this.encodedDataText.username=value.username;
     this.encodedDataText.email=value.email;
   });
    
   

  }




}
