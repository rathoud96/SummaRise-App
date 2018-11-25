import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SavedPage } from '../pages/saved/saved';
import { IonicStorageModule } from '@ionic/storage';
import aylien_textapi from '../../node_modules/aylien_textapi';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//providers
import { AuthService } from '../services/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {GooglePlus } from '@ionic-native/google-plus';
import { CustomFormsModule } from 'ngx-custom-validators';
import { HttpModule } from '@angular/http';
//import {AngularFireModule } from 'angularfire2';
import { SummaryPage } from '../pages/summary/summary';
import { SummarisePage } from '../pages/summarise/summarise';
import { SettingPage } from '../pages/setting/setting';
import { SettingsProvider } from '../providers/settings/settings';
import { PopoverPage } from '../pages/popover/popover';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SummaryPage,
    LoginPage,
    SignupPage,
    SavedPage,
    SummarisePage,
    SettingPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    CustomFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    SavedPage,
    SummaryPage,
    SummarisePage,
    SettingPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    AuthService,
    SettingsProvider,
    HTTP
  ]
})
export class AppModule {}
