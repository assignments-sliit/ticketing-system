import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { User, firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage implements OnInit {

  userHomeTitle: String = Constants.USER_HOME_TITLE;

  barcodeScannerOptions: BarcodeScannerOptions; //not needed

  encodedData: any;

  encodedDataText: any;

  public user: Observable<User>;

  constructor(public userService: UserService,
    private barcodeScanner: BarcodeScanner,
    public storage: Storage,
    private firestoreService: AngularFirestore,
    public alertController: AlertController
  ) {
    this.encodedDataText = {}
  }

  ngOnInit() {


    this.storage.get('users').then((value) => {
      console.log(value.name);
      this.encodedData = JSON.stringify(value);
      this.encodedDataText.name = value.name;
      this.encodedDataText.username = value.username;
      this.encodedDataText.email = value.email;
      this.encodedDataText.isQrScanned = value.isQrScanned;
      console.log(value.isQrScanned);

    });



  }




}
