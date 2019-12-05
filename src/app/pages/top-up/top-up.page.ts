import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'; 
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {

  accountNumber;
  loan;
  balance;
  amount:number;
  payMethod;
  showCash: boolean = false;
  showCard: boolean = false;
  qrok:boolean=false;
  encodedData:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private barcodeScanner: BarcodeScanner,
    public storage: Storage

  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.accountNumber = this.router.getCurrentNavigation().extras.state.accountNumber
      } else {
        console.log('Nothing in params state');
      }
    });
  }

  ngOnInit() {
    this.firestore.collection('account').ref.where('accountnum', '==', this.accountNumber).onSnapshot(snap => {
      snap.forEach(ref => {
        this.loan = ref.data().loan;
        this.balance = ref.data().balance;
      })
    })
  }

  enterAmount() {
    console.log(this.payMethod);

    if (this.payMethod === "cash") {
      //show qr card
      this.showCash = true;
      this.showCard = false;

    } else if (this.payMethod === "card") {
      this.showCard = true;
      this.showCash = false;


    }

  }

  generateCashQr() {
    var qrData;
    this.storage.get("account").then((val) => {
      if (val) {
        this.accountNumber = val.accountnum;
        qrData=val.accountnum+" "+this.amount;
        this.encodedData=qrData;
        this.qrok=true;
      }
    })



  }









}
