import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-loan-req-modal',
  templateUrl: './loan-req-modal.page.html',
  styleUrls: ['./loan-req-modal.page.scss'],
})


export class LoanReqModalPage implements OnInit {  
  loanAmount:number;
  amount:any;

  isLoanOk:boolean=false;

  constructor(public navParams: NavParams,
    private firestore: AngularFirestore,
    private modalController: ModalController,
    public storage:Storage) {
    console.log(navParams.get('accountNumber'));
    
   }


  ngOnInit() {
  
    
  }

  getLoan(){
    var id:any;
    this.storage.get('account').then(value=>{
      this.amount=value.amount;
    })
   this.firestore.collection("account").ref.where("accountnum","==",this.navParams.get('accountNumber')).onSnapshot(snap=>{
     snap.forEach(ref=>{
       var currentLoan=ref.data().loan;
       this.firestore.collection("account").doc(ref.id).update({loan:(currentLoan+this.loanAmount),amount:(this.amount+this.loanAmount)}).then(()=>{
         this.isLoanOk=true;
       })
     })
   })
   
  }

  async closeLoanModal(){
    this.modalController.dismiss();
  }

}
