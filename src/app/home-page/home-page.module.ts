import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home-page';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    IonicModule
  ],

  exports:[HomePage]
})
export class HomePageModule { }
