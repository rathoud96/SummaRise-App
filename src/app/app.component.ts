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
import { SettingPage } from '../pages/setting/setting';
import { SettingsProvider } from './../providers/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
    selectedTheme: String;
    userName: string;
    

  constructor(platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private authservice:AuthService,
        private storage: Storage,
        private settings:SettingsProvider) {

        this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
          
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
        //this.userName = user.uid;
        // console.log(user);
        firebase.database().ref('users/'+user.uid+'/userName').once('value',data=>{
            this.userName = data.val();
        });
        this.navCtrl.setRoot(SummaryPage);
      }
    });
        
    //this.getUserName()
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  // getUserName(){

  // // console.log(this.userName);    
  // }
  logout(){
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  goToSummarise(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SummaryPage);
  }goToSaved(params){
    if (!params) params = {};
    this.navCtrl.push(SavedPage);
  }
  goToSetting(params){
    if (!params) params = {};
    this.navCtrl.push(SettingPage);
  }
  goToContact(params){
    if (!params) params = {};
    this.navCtrl.push(FeedbackPage);
  }
  
}
