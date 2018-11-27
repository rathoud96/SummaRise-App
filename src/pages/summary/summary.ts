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
  summary_size_type:boolean
  ext_abst:any
  saved:boolean
  url_submit:any
  checked:any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private storage:Storage,
     private http:Http,
     private popoverCtrl:PopoverController) {
        this.type = "url";
        this.range_value = 50
        this.summary_size_type = true
        this.ext_abst = "extractive"
        this.bck_color_e = "#3498db"
        this.saved = false;
        this.checked = "ext";
        this.summaryID = 0
  }
  funct(ev){
    this.checked = ev
    if(this.checked == "ext"){
      this.summary_size_type = true
      this.ext_abst = "extractive"
    }
    
    else{
      this.summary_size_type = true
      this.ext_abst = "abstractive" 
    }
    
  }
  value_change(value){
    this.range_value = value
  }
  // change_color_e(){
  //   this.bck_color_e = "#3498db"
  //   this.bck_color_a = "transparent"
  //   this.summary_size_type = true
  // }
  // change_color_a(){
  //   this.bck_color_a = "#3498db"
  //   this.bck_color_e = "transparent"
  //   this.summary_size_type = false
  // }

   dataChange(e:any){
    console.log(e.checked);
    this.saved = e.checked
  }
  onSubmit(form: NgForm) {
     const loading = this.loadingCtrl.create({
       content: 'Summarising data...'
     });
     let text = form.value.summary_text
     let title = form.value.summary_title
     loading.present();
    
     this.http.post('https://summarise-api.herokuapp.com/apicall/text',{title,text,sentences_percentage:this.range_value},{}).map(res=>res.json()).subscribe(data=>{

      let response = {
        text:data.dataa.text,
        title:form.value.summary_title,
        summarised_text:data.dataa.sentences,
        type:this.ext_abst,
        id:this.summaryID    
    }
    loading.dismiss();
    this.navCtrl.push(PopoverPage,{animation: true, direction: 'up', duration:500, data:response });
    if(this.saved){
        firebase.auth().onAuthStateChanged(user=>{
          this.userId = user.uid;
        firebase.database().ref('users/'+this.userId+'/summaryId').once('value',data=>{
          console.log(data.val());
          this.summaryID = data.val();
          response.id = this.summaryID
          firebase.database().ref('users/'+this.userId+'/summary/'+this.summaryID).set(response);
          firebase.database().ref('users/'+this.userId+'/summaryId').set(this.summaryID+1);
        });
        });
      }
    });  
     loading.dismiss();
     form.reset();
  }

  onSubmitUrl(form: NgForm){
    
    console.log(this.range_value);

    var url = form.value.http;
    console.log(url);
    const loading = this.loadingCtrl.create({
      content: "Summarising data.."
    });
    loading.present();
    this.http.post('https://summarise-api.herokuapp.com/apicall/url',{url,sentences_percentage:this.range_value},{}).map(res=>res.json()).subscribe(data=>{

      let response = {
        text:data.dataa.text,
        title:data.dataa.results[0].result.title,
        summarised_text:data.dataa.results[1].result.sentences,
        type:this.ext_abst,
        id:this.summaryID    
    }
    loading.dismiss();
    this.navCtrl.push(PopoverPage,{animation: true, direction: 'up', duration:500, data:response });
    if(this.saved){
      firebase.auth().onAuthStateChanged(user=>{
        this.userId = user.uid;
      firebase.database().ref('users/'+this.userId+'/summaryId').once('value',data=>{
        console.log(data.val());
        this.summaryID = data.val();
        response.id = this.summaryID
        firebase.database().ref('users/'+this.userId+'/summary/'+this.summaryID).set(response);
        firebase.database().ref('users/'+this.userId+'/summaryId').set(this.summaryID+1);
      });
      });
      }
    });    
     
  form.reset();
  }
 
}
