import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage implements OnInit {

  userHomeTitle: String = Constants.USER_HOME_TITLE;

  barcodeScannerOptions: BarcodeScannerOptions; //not needed

  encodedData: any;

  constructor(public userService:UserService,private barcodeScanner: BarcodeScanner) {
    this.encodedData= "My Name is Manoj"//userService.currentUser;
   }

  ngOnInit() {
    //this.encodedText();
  }

  // encodedText() { 
  //   this.barcodeScanner
  //     .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedData)
  //     .then(
  //       encodedData => {
  //         console.log(encodedData);
  //         this.encodedData = encodedData;
  //       },
  //       (err) => {
  //         console.log("Error Occurred: " + err);
          
          
  //       }
  //     )
  // }

}
