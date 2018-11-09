import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummarisePage } from './summarise';

@NgModule({
  declarations: [
    SummarisePage,
  ],
  imports: [
    IonicPageModule.forChild(SummarisePage),
  ],
})
export class SummarisePageModule {}
