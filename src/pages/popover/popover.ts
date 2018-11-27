import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  data:any
  details:boolean
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    this.details = false
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  showDetails(){
    this.details = !this.details
  }
}
