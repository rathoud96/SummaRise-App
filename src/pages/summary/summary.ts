import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import firebase from 'firebase';
import { HTTP } from '@ionic-native/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { PopoverPage } from '../popover/popover';
import { from } from 'rxjs/observable/from';
import { json } from 'ngx-custom-validators/src/app/json/validator';



@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  userId:any
  type:any
  summaryID:any
  text:any
  bck_color_e: any
  bck_color_a:any
  range_value:any
  summary_size_type:any
  ext_abst:any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private storage:Storage,
     private http:Http,
     private popoverCtrl:PopoverController) {
        this.type = "url";
        this.range_value = 40
        this.summary_size_type = "percentage"
        this.ext_abst = "ext"
        
  }

  value_change(value){
    console.log(value)
  }
  change_color_e(){
    this.bck_color_e = "#3498db"
    this.bck_color_a = "transparent"
  }
  change_color_a(){
    this.bck_color_a = "#3498db"
    this.bck_color_e = "transparent"
  }
  onSubmit(form: NgForm) {
     const loading = this.loadingCtrl.create({
       content: 'Summarising data...'
     });
     loading.present();
     console.log(form.value.summary);
     console.log(this.userId);
     firebase.auth().onAuthStateChanged(user=>{
       this.userId = user.uid;
      firebase.database().ref('users/'+this.userId+'/summaryId').once('value',data=>{
        console.log(data.val());
        this.summaryID = data.val();
        firebase.database().ref('users/'+this.userId+'/summary/'+this.summaryID).set(form.value.summary);
        this.summaryID+=1;
        firebase.database().ref('users/'+this.userId+'/summaryId').set(this.summaryID);
     });
     });
     //form.value.summary = "";
     loading.dismiss();
    //  const popover = this.popoverCtrl.create(PopoverPage,{data:form.value.summary});
    //   popover.present();
  }

  onSubmitUrl(form: NgForm){
    var url = form.value.http;
    console.log(url);
    
    this.http.post('http://localhost:3000/apicall/url',{url,sentences_number:7},{}).map(res=>res.json()).subscribe(data=>{
      console.log(data.text);
    });


    // this.http.get('https://api.aylien.com/api/v1/summarize',opt).map(res=>res.json()).subscribe(data=>{
    //         console.log(data);

    //         this.navCtrl.push(PopoverPage,{animation: true, direction: 'up', duration:500, data:data });
    // });
    
     //this.http.get('http://api.smmry.com/&SM_API_KEY=D4448EBCCB&SM_LENGTH=40&SM_URL='+url).map(res => res.json()).subscribe(data => {
       
    //     var urlSummary = {
    //         title: data.sm_api_title,
    //         summary: data.sm_api_content,
    //         reduced: data.sm_api_content_reduced
    //     }
    //     console.log(urlSummary);
    //     const loading = this.loadingCtrl.create({
    //       content: 'Summarising data...'
    //     });
    //     loading.present();
    //     console.log(form.value.summary);
    //     console.log(this.userId);
    //     firebase.auth().onAuthStateChanged(user=>{
    //       this.userId = user.uid;
    //      firebase.database().ref('users/'+this.userId+'/summaryId').once('value',data=>{
    //        console.log(data.val());
    //        this.summaryID = data.val();
    //        firebase.database().ref('users/'+this.userId+'/summary/'+this.summaryID).set(urlSummary);
    //        this.summaryID+=1;
    //        firebase.database().ref('users/'+this.userId+'/summaryId').set(this.summaryID);
    //     });
    //     });
        //form.value.summary = "";
        //loading.dismiss();
        
  // });
  }
 
}
