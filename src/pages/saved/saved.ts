import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { SummarisePage } from '../summarise/summarise';
import { SettingPage } from '../setting/setting';


@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
  summaryList:Array<any> = []
  userId:any
  summarised:any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage,private loadingCtrl: LoadingController) {
      // storage.get('userID').then(data=>{
      //   this.userId = data;
      //   console.log(this.userId);
      this.viewSummary();
          
  }

  viewSummary(){
    firebase.auth().onAuthStateChanged(user=>{
      this.userId = user.uid;
      
      firebase.database().ref('users/'+this.userId).on('value',data=>{
        let x = data.val().summary
        //console.log(data.val().summary);
        Object.keys(x).map((keys)=>{
          this.summaryList.push(x[keys])
        });
        // this.summaryList.forEach(data=>{
        //     console.log(data)
        // });
        //console.log(this.summaryList)
    });
    });
  }
  delete(summary){
    this.summaryList = this.summaryList.filter(element => {
      if (element) {
        if (element.id == summary.id) {
          console.log(summary.id);
          return element;
        }
      }
    }
    
    );
    const loading = this.loadingCtrl.create({
      content: "Deleting data.."
    });
    loading.present();
    console.log(this.summaryList);
    firebase.auth().onAuthStateChanged(user=>{
      firebase.database().ref('users/'+user.uid+"/summary/"+summary.id).remove();
    });
    
    this.navCtrl.pop();
    this.navCtrl.push(SavedPage);
    loading.dismiss();
    
  }
  showData(summarised){
    this.navCtrl.push(SummarisePage,{
      data:summarised
    });
  }

  

}
