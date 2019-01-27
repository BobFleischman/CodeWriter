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
import {TabViewModule} from 'primeng/tabview';
import { AppGeneratorComponent } from './components/app-generator/app-generator.component';
import { ObjectGeneratorComponent } from './components/object-generator/object-generator.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { ComponentsGeneratorComponent } from './components/components-generator/components-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PersonComponent,
    AppGeneratorComponent,
    ObjectGeneratorComponent,
    FormGeneratorComponent,
    ComponentsGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    CheckboxModule,
    CalendarModule,
    PanelModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
