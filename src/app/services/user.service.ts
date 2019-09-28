/**
 *  NOTE TO DEVELOPERS: ALL VARIABLES SHOULD BE IN UPPERCASE LETTER AND SHOULD NOT EXCEED MORE THAN 50 CHARS!
 * - Manoj
 * 
 * 02-SEP-2019 : Manoj : Added the file.
 * ...
 * 23-SEP-2019 : Manoj : Added dialogs for login validation errors, added constants
 * 24-SEP-2019 : Manoj : Added Toast for successful login
 * 
 * 
 */




import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { loadingController, ToastButton } from '@ionic/core';
import { Constants } from '../constants/constants';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public storage: Storage
  ) { }

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  getUserStatus() {
    return this.currentUser;
  }


  async signUp(users: User) {

    const email = users.email
    const password = users.password

    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          id: userResponse.user.uid,
          name: users.name,
          phone: users.phone,
          email: userResponse.user.email,
          nic: users.nic,
          role: users.type,
          photoURL: users.photoUrl,
          isQrScanned: users.isQrScanned
        }

        //add the user to the database
        this.firestore.collection("users").add(user)
          .then(user => {
            user.get().then(x => {

              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);

              //create an account
              this.accountcreate();

              this.router.navigate(["/sign-in"]);
            })
          }).catch(err => {
            console.log(err);
          })


      })
      .catch((err) => {
        console.log(Constants.UNKNOWN_ERROR_WITH_PARAMETER, err);
      })



  }



  //Accont table 
  accountcreate() {


    let account = {
      accountnum: Math.floor(100000 + Math.random() * 900000),
      id: this.currentUser.id,
      email: this.currentUser.email,
      amount: 50,
      loan: 0,
      date: new Date()

    }
    this.firestore.collection(`account/`).add(account);


  }

  //Login with Email and password 
  async login(email: string, password: string) {

    const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)   //check mail and password 
      .then((user) => {
        this.firestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            console.log("userRef", userRef.data());

            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser);  //setUserStatus
            this.storage.set("users", this.userStatus);

            this.router.navigate([Constants.URL_MENU]); //On success login, navigate to this page

            this.successSignInToast(userRef.data().name); //welcome toast


          })
        })

      }).catch(err => {
        console.log(err.code);

        if (err.code == Constants.FIREBASE_AUTH_WRONG_PASSWORD_CODE) {
          this.incorrectPasswordAlert(email);
        } else if (err.code == Constants.FIREBASE_AUTH_INVALID_EMAIL_CODE) {
          this.incorrectEmailAlert();
        } else if (err.code == Constants.FIREBASE_AUTH_USER_NOT_FOUND) {
          this.userNotFound();
        } else if (err.code == Constants.FIREBASE_AUTH_TOO_MANY_REQUESTS) {
          this.tooManyRequests();
        }
      }
      )



  }


  async successSignInToast(name) {
    const toast = await this.toastController.create({
      message: 'Welcome ' + name + "!",
      duration: 1000
    });
    toast.present();
  }

  async tooManyRequests() {

    const alert = await this.alertController.create({
      header: Constants.ALT_HD_TOO_MUCH_REQ,
      subHeader: Constants.ALT_ST_TOO_MUCH_REQ,
      message: Constants.ALT_MSG_TOO_MUCH_REQ,
      buttons: [Constants.ALT_BTN_OK]
    });

    await alert.present();

  }

  async incorrectPasswordAlert(email) {
    const alert = await this.alertController.create({
      header: Constants.ALT_HD_INCORRECT_PASSWORD,
      subHeader: Constants.ALT_ST_INCORRECT_PASSWORD,
      message: Constants.ALT_MSG_INCORRECT_PASSWORD1 + email + Constants.ALT_MSG_INCORRECT_PASSWORD2,
      buttons: [Constants.ALT_BTN_OK]
    });

    await alert.present();

  }

  async incorrectEmailAlert() {

    const alert = await this.alertController.create({
      header: Constants.ALT_HD_INVALID_EMAIL,
      subHeader: Constants.ALT_ST_INVALID_EMAIL,
      message: Constants.ALT_MSG_INVALID_EMAIL,
      buttons: [Constants.ALT_BTN_OK]
    });

    await alert.present();

  }

  async userNotFound() {

    const alert = await this.alertController.create({
      header: 'User not Found',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

  }

  async logOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log(Constants.SIGN_OUT_SUCCESSFUL);
        //set current user to null to be logged out
        this.currentUser = null;
        //set the listenener to be null, for the UI to react
        this.setUserStatus(null);
        this.storage.set("users", null);
        this.ngZone.run(() => this.router.navigate(["/sign-in"]));

      }).catch((err) => {
        console.log(err);
      })
  }


  userChanges() {
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.firestore.collection("users").ref.where("email", "==", currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)
            this.storage.set("users", this.userStatus);

            if (this.currentUser.isQrScanned) {
              this.presentAlert();
            }


            // if (userRef.data().role !== "admin") {
            //   this.ngZone.run(() => this.router.navigate(["/menu"]));
            // } else {
            //   this.ngZone.run(() => this.router.navigate(["/admin"]));
            // }
          })
        })
      } else {

        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/sign-in"]));
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'Your QR has been Scanned',
      message: 'Click Proceed to enter the start and the destination',
      buttons: [
        {
          text: 'Cancel Trip',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            //change QR to false in db here
          }
        },
        {
          text: 'Proceed',
          handler: () => {
            this.router.navigateByUrl('/process-trip');
            //change QR to false in db here

          }
        }]
    });

    await alert.present();
  }

  //user profile update
  async userProfileUpdate(users: User) {

    let user = {

      email: users.email,
      phone: users.phone,
      name: users.name,
      nic: users.nic

    }

    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {

        this.firestore.collection("users").ref.where("id", "==", currentUser.uid).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.firestore.collection("users").doc(userRef.id).update(user)
              .then((user) => {
                this.firestore.collection("users").ref.where("email", "==", users.email).onSnapshot(snap => {
                  snap.forEach(userRef => {

                    this.currentUser = userRef.data();
                    this.setUserStatus(this.currentUser);  //setUserStatus
                    this.storage.set("users", this.userStatus);
                    console.log(this.userStatus);
                    //On success login, navigate to this page

                    this.successSignInToast(userRef.data().name); //welcome toast
                    this.ngZone.run(() => this.router.navigate([Constants.URL_MENU]));

                  })
                })

              }).catch(err => {
                console.log(err);
              })

          });
        })

      } else {

        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/sign-in"]));
      }
    })

  }

}





