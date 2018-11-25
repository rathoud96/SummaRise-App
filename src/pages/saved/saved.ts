import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { SummarisePage } from '../summarise/summarise';


@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
  summaryList:Array<any>
  userId:any
  summarised:any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage) {
      // storage.get('userID').then(data=>{
      //   this.userId = data;
      //   console.log(this.userId);
      this.viewSummary();
          
  }

  viewSummary(){
    firebase.auth().onAuthStateChanged(user=>{
      this.userId = user.uid;
      firebase.database().ref('users/'+this.userId+'/summary').once('value',data=>{
        console.log(Object.keys(data.val()));
        this.summaryList = data.val();
        this.summaryList.forEach(data=>{
          console.log(data)
        });
    });
    });
  }
  delete(summary){
    console.log(summary)
  }
  showData(summarised){
    this.navCtrl.push(SummarisePage,{
      data:summarised
    });
  }

  

}
