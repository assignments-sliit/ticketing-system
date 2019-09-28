import { Component, OnInit } from '@angular/core';
import{Storage} from '@ionic/storage';
import{UserService} from '../../../services/user.service';
import { Router, RouterEvent } from '@angular/router';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import{User} from '../../../models/user';
import{finalize} from 'rxjs/operators';
import { AngularFireStorage, StorageBucket} from '@angular/fire/storage';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  ImgSrc:string="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
  SelectImgUrl:any=null;

  public createUserEditForm: FormGroup;
  userStatus=this.firebaseService.userStatus;

  public user_name:any;
  public user_email:any;
  public phone:any;
  public photo_URL:any;
  public UI:any;
  public NIC:any;


  constructor(private firebaseService: UserService,
    public storage:Storage,
    private router:Router,
    formbuilder: FormBuilder,
    private dbstorages:AngularFireStorage) {

      this.createUserEditForm = formbuilder.group({
        username: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        nic:['',Validators.required],
        photoURL:['',Validators.required]
       
      });
     }

     ngOnInit() {

      this.firebaseService.userChanges();
     // this.setTheValue();
      this.getTheValue();
      this.firebaseService.userStatusChanges.subscribe(x =>this.userStatus =x);
    }
  
    // get value from ionic storage 
    getTheValue(){
      
      this.storage.get("users").then( (val) =>{
          if(val){ 
            this.user_name=val.name;
            this.phone=val.phone;
            this.user_email=val.email;
            //this.photo_URL=val.photoURL;
            this.UI=val.id;
            this.NIC=val.nic;
            if(val.photoURL){
              this.ImgSrc=val.photoURL;
            }else{
              this.ImgSrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
            }
           
            console.log("Profileedit "+val.photoURL);
            
          }else{
            this.ImgSrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
          }
      })
  
     }

     Profile_update(fromValue){
    
      if(this.createUserEditForm.value){
        const filepth=`pic/${this.UI}/${this.SelectImgUrl.name}_${new Date().getTime()}`
        const fileRef=this.dbstorages.ref(filepth);
        
        this.dbstorages.upload(filepth,this.SelectImgUrl)
        .snapshotChanges().pipe(
          finalize(()=>{
                fileRef.getDownloadURL().subscribe((url)=>{
                  const user: User = {
                    name: this.createUserEditForm.value.username,
                    email: this.createUserEditForm.value.email,
                    nic:this.createUserEditForm.value.nic,
                    phone: this.createUserEditForm.value.phone,
                    password: '',
                    type: Constants.USER_TYPE_USER,
                    photoUrl: url,
                    isQrScanned:false
                  }



                  this.firebaseService.userProfileUpdate(user)
                })
          })
       ).subscribe();
 
 
       console.log(fileRef);   
 
      }else{
             console.log("uploades error")            
             
      }
       
       //  
        
   
 }
 
 showPerview(event:any){
 
     if(event.target.files && event.target.files[0]){
       const reader=new FileReader();
       reader.onload=(e:any) =>this.ImgSrc=e.target.result;
       reader.readAsDataURL(event.target.files[0]);
       this.SelectImgUrl=event.target.files[0]
     }else{
       this.ImgSrc=this.ImgSrc;
       this.SelectImgUrl=null;
     }
 

}
}
