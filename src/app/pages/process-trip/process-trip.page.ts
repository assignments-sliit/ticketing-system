import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoanReqModalPage } from '../loan-req-modal/loan-req-modal.page';
declare var google;

@Component({
  selector: 'app-process-trip',
  templateUrl: './process-trip.page.html',
  styleUrls: ['./process-trip.page.scss'],
})
export class ProcessTripPage implements OnInit {

  start: any;
  destination: any;
  mapIconClass: any;
  isTripInfoFilled: boolean = false;
  x: any;
  totalDistance: any;
  busFare: any;

  isStartDisabled: boolean = false;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };

  distanceMatrixService = new google.maps.DistanceMatrixService;
  accountNumber: any;
  balance: any;
  loan: any;
  constructor(public geoLocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    public userService: UserService,
    private firestore: AngularFirestore,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public router: Router,
    public storage: Storage
  ) {
    this.x = [];
    this.busFare = 0;
  }

  userStatus = this.userService.userStatus;


  ngOnInit() {

    this.userService.userChanges();
    this.userService.userStatusChanges.subscribe(
      x => this.userStatus = x
    );

  }

  setStart() {
    if (this.start != "") {
      this.mapIconClass = "input-map";
    }

    this.geoLocation.getCurrentPosition().then((response) => {
      this.currentLocation.lat = response.coords.latitude;
      this.currentLocation.lng = response.coords.longitude;

      console.log('Latitude: ' + response.coords.latitude);
      console.log('Latitude: ' + response.coords.longitude);

      this.isStartDisabled = true;
      if (this.isStartDisabled) {
        this.start = "Your Location";
      }
    })
  }

  getAddressFromCoords(lat, lng) {
    let opts: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    }

    this.nativeGeocoder.reverseGeocode(lat, lng, opts)
      .then((result: NativeGeocoderReverseResult[]) => {
        result.forEach(element => {
          console.log(element);
        });
      }).catch(err => {
        console.log(err);
      })
  }


  async findRoute() {
    var startpoint: any;
    const loading = await this.loadingCtrl.create({
      message: 'Calculating Distance...'
    });

    if (this.start !== "Your Location") {
      startpoint = this.start
    } else {
      startpoint = this.currentLocation;
    }

    this.distanceMatrixService.getDistanceMatrix({
      origins: [startpoint],
      destinations: [this.destination],
      travelMode: 'TRANSIT',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: true,
      avoidTolls: true
    },
      (response, status) => {

        if (status != 'OK') {
          console.log('Error getting direction');
        } else {
          this.x = response.rows[0].elements[0].distance.text.split(" ");
          this.totalDistance = this.x[0];
          this.busFare = this.totalDistance * 4; //  4/= per KM :)

          this.storage.get("account").then((val) => {
            if (val) {
              this.accountNumber = val.accountnum;
              this.firestore.collection('account').ref.where('accountnum', '==', this.accountNumber).onSnapshot(snap => {
                snap.forEach(ref => {
                  this.balance = ref.data().amount;
                  this.loan = ref.data().loan;
                })
              })
            }
          }).then(() => {
            loading.dismiss().then(() => {
              this.setInfoFilledTrue();
            })
          })
        }
      })
    return await loading.present();
  }


  setInfoFilledTrue() {
    this.isTripInfoFilled = true;
  }


  async payByCash() {
    const alert = await this.alertController.create({
      header: 'Cash Payment',
      message: 'Please pay the conductor a sum of ' + this.busFare + ' in cash. Kindly provide change. Thank you!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Cash Okay');
            this.router.navigateByUrl('menu/users-home');
          }
        }
      ]
    });

    await alert.present();
  }


  async payByAccount() {

    if (this.busFare > this.balance) {
      const alert = await this.alertController.create({
        header: 'Account',
        message: 'The Bus fare exceeds the account balance. Do you want to obtain a loan?',
        buttons: [
          {
            text: 'Not now',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('loan Cancel');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('loan Okay');
              this.presentLoanModal();
            }
          }
        ]
      });

      await alert.present();

    } else {
      var s = true;
      this.balance = this.balance - this.busFare;
      this.firestore.collection('account').ref.where('accountnum', '==', this.accountNumber).onSnapshot(snap => {
        snap.forEach(ref => {
          if (s) {
            this.firestore.collection("account").doc(ref.id).update({ amount: this.balance }).then(() => {
              s = false;
            })
              .catch(err => {
                console.log(err);
              })
          }
        })
      })
      this.payByCard();
    }
  }


  async payByCard() {
    const alert = await this.alertController.create({
      header: 'Card Payment',
      message: 'Your payment of ' + this.busFare + 'LKR has been made successfully! Available Blanace is ' + this.balance + 'LKR Thank you!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Cash Okay');
            this.router.navigateByUrl('menu/users-home');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentLoanModal() {

    const modal = await this.modalController.create({
      component: LoanReqModalPage,
      componentProps: {
        'accountNumber': this.accountNumber,
        'balance': this.balance,
        'loanAmount': this.loan
      }
    });
    console.log(this.balance);
    console.log(this.loan);

    return await modal.present();
  }













}
