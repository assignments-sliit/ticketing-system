import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-loan-req-modal',
  templateUrl: './loan-req-modal.page.html',
  styleUrls: ['./loan-req-modal.page.scss'],
})

export class LoanReqModalPage implements OnInit {
  loanAmount: number;
  balance: any;
  accountNumber: any;
  newLoan: number;
  isLoanOk: boolean = false;

  constructor(public navParams: NavParams,
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public storage: Storage) {
  }


  ngOnInit() {
    console.log(this.accountNumber + " " + this.loanAmount + " " + this.balance); //check if the parameters are correctly passed to the modal
  }


  getLoan() {
    this.loanAmount+=this.newLoan;
    this.balance+=this.newLoan;    
    
    //update the account details as per the loan request of the current user
    this.firestore.collection("account").ref.where("accountnum", "==", this.accountNumber).onSnapshot(snap => {
      snap.forEach(ref => {
        this.firestore.collection("account").doc(ref.id).update({
          loan: this.loanAmount,
          amount: this.balance
        }).then(() => {
          this.isLoanOk = true;
        })
      })
    })
  }


  async closeLoanModal() {
    this.modalController.dismiss(); //to close the modal
  }

}
