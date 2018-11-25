import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { SignupPage } from './../signup/signup';
import { SummaryPage } from '../summary/summary';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
      public statusbar:StatusBar,
      private authService: AuthService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private googlePlus: GooglePlus,
      private menu: MenuController,
      public storage:Storage) {

      this.statusbar.backgroundColorByHexString('#2980b9');
  }

  onGoogleSignIn() {
    //TRY
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
      title: "Signin Failed!",
      message: error,
      buttons:['Ok']
      });
    alert.present();
    return false;
    });

  }  

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        //console.log("data"+data.user);
        this.storage.set("userID",data.user.uid);
        
        const alert = this.alertCtrl.create({
          title: "Success!",
          message: "Welcome Back!",
          buttons:['Ok']
        });
        loading.dismiss();
        alert.present();
        this.navCtrl.setRoot(SummaryPage);
        
        //Locally Store User Data
        console.log(data.user.uid);
        let x = firebase.database().ref('users/' + data.user.uid);
        x.once('value', user => {
          let User = user.val();
          console.log(User);
        });
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Sign in Failed!",
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
  //  Forgot Password
    forgotPassword() {
      //Alert
      let emailID;
      let alert = this.alertCtrl.create({
        title: 'Forgot Password',
        inputs: [
          {
            name: 'emailID',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Submit',
            handler: data => {
              emailID = data.emailID;
              console.log(emailID);
              firebase.auth().sendPasswordResetEmail(emailID).then(function () {
                let alert = this.alertCtrl.create({
                  title: 'Email Sent'
                });
                alert.present();
                // Email sent.
                console.log("Email sent!");
  
              }).catch(function (error) {
                // An error happened.
              });
            }
          }
        ]
      });
      alert.present();
  
   } 
    
   //Navigate to SignupPage
    navSignup() {
      this.navCtrl.setRoot(SignupPage);
    } 
    ionViewDidEnter() {
      this.menu.swipeEnable(false);
    }
    ionViewWillLeave() {
      this.menu.swipeEnable(true);
    }
  }
  


