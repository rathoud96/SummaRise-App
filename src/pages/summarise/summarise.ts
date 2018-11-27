import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SummarisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summarise',
  templateUrl: 'summarise.html',
})
export class SummarisePage {
  data:any
  details:boolean
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummarisePage');
  }
  showDetails(){
    this.details = !this.details
  }
}
