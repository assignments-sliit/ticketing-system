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
  public unsubscribeBackEvent: any;
  constructor(public userService: UserService,
    private barcodeScanner: BarcodeScanner,
    public storage: Storage,
    private firestoreService: AngularFirestore,
    public alertController: AlertController,
    private platform: Platform
  ) {
    this.encodedDataText = {}
  }

  userStatus=this.userService.userStatus;


  ngOnInit() {
    this.initializeBackButtonCustomHandler();

   this.userService.userChanges()
   this.userService.userStatusChanges.subscribe(x =>this.userStatus =x);

    this.storage.get('users').then((value) => {
      console.log(value.name);
       
     var x =value;
     this.encodedData=x.id;
      this.encodedDataText.name = value.name;
      this.encodedDataText.username = value.username;
      this.encodedDataText.email = value.email;
      this.encodedDataText.isQrScanned = value.isQrScanned;
      console.log(value.isQrScanned);

    });
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }
 

  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  async () => {
        //alert("back pressed home" + this.constructor.name);
        const alert = await this.alertController.create({
          header: 'Leave',
          message: 'Are you sure want to logout?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                this.userService.logOut();
              }
            },{
              text:'No',
              handler:()=>{
                console.log('Stays in app')
              }
            }
          ]
        });
    
        await alert.present();
    });

    
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }




}
