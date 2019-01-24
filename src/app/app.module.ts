import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PersonComponent } from './person/person.component';

import {MessageModule } from 'primeng/message'
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    CheckboxModule,
    CalendarModule,
    PanelModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
