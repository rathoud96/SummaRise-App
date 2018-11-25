import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthService } from './../../services/auth';
import { LoginPage } from '../login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { SummaryPage} from '../summary/summary';
import firebase from 'firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  email: String;
  password: String;

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private googlePlus: GooglePlus,
    private storage: Storage,
    private menu: MenuController
  ) {
    //Retriving Users List from firebase
    //firebase.database().ref('/Users');  
  }

  onGoogleSignIn() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.googlePlus.login({
      'webClientId': '204670762547-t150vl1l4e9v9rd2ca51f7jker6uhhup.apps.googleusercontent.com',
      'offline': true
  })
  .then( response => {
    const googleCredential = firebase.auth.GoogleAuthProvider
      .credential(response.idToken);
    console.log("dsadas"+response);
    
    firebase.auth().signInWithCredential(googleCredential)
      .then( res => { 

        console.log("Firebase success: " + JSON.stringify(res));
        const alert = this.alertCtrl.create({
          title: "Success!",
          message: "Hello!"+res.displayName,
          buttons:['Ok']
        });
        loading.dismiss();
        alert.present();
      });
  })
  .catch(error => {
    loading.dismiss();
      const alert = this.alertCtrl.create({
      title: "Signup Failed!",
      message: error.message,
      buttons:['Ok']
      });
    alert.present();
    return false;
    });
  }

  
  onSubmit(form: NgForm) {
    // this.storage.set("ExtraInfo", {Name:form.value.name,PhoneNumber:form.value.phoneno}); 
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Success!",
          message: "Hello!"+form.value.name,
          buttons:['Ok']
        });
        loading.dismiss();
        alert.present();
        //Send to Firebase
        let userInfo = {
          userID: data.user.uid,
          userName: form.value.name,
          summaryId:0,
          email: data.user.email
        }
        //Sending to Firebase
        console.log(userInfo);
        firebase.database().ref('users/' + userInfo.userID).set(userInfo);
        //Locally Store User Data
        //this.storage.set("UserInfo", userInfo);
        this.navCtrl.setRoot(SummaryPage);
      })
      .catch(error => {
        loading.dismiss();
          const alert = this.alertCtrl.create({
          title: "Signup Failed!",
          message: error.message,
          buttons:['Ok']
          });
        alert.present();
        return false;
      });
  }

  //Navigate to LoginPage
  navLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
  //Menu Swipe Disable
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}  
