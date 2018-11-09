import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SavedPage } from '../pages/saved/saved';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { SummaryPage} from '../pages/summary/summary'
import firebase from 'firebase';
import { AuthService } from '../services/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
    userName: string;
    

  constructor(platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private authservice:AuthService,
        private storage: Storage) {

    //firebase
    firebase.initializeApp ({
      apiKey: "AIzaSyDsuMWTuRN_70yGCjXIczUv6Un4U3dLMj4",
        authDomain: "summarise-93c4b.firebaseapp.com",
        databaseURL: "https://summarise-93c4b.firebaseio.com",
        projectId: "summarise-93c4b",
        storageBucket: "summarise-93c4b.appspot.com",
        messagingSenderId: "204670762547"
    });
    
    firebase.auth().onAuthStateChanged(user => {
      
      if (user) {
        this.userName = user.uid;
        console.log(user);
        this.navCtrl.setRoot(SummaryPage);
      }
    });
        
    this.getUserName()
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  getUserName(){
    this.storage.get('userData').then(data=>{
      this.userName = data.name;
      console.log(this.userName + " "+ data);
    })
  }
  logout(){
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  goToSummarise(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SummaryPage);
  }goToSaved(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SavedPage);
  }
  
}
