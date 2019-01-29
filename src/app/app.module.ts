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
import {TableModule} from 'primeng/table';

import { AppGeneratorComponent } from './components/app-generator/app-generator.component';
import { ObjectGeneratorComponent } from './components/object-generator/object-generator.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { ComponentsGeneratorComponent } from './components/components-generator/components-generator.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { ListGeneratorComponent } from './components/list-generator/list-generator.component';
import { CodeComponent } from './dataapp/code/code.component';
import { DataComponent } from './dataapp/data/data.component';
import { FieldFormComponent } from './field-form/field-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PersonComponent,
    AppGeneratorComponent,
    ObjectGeneratorComponent,
    FormGeneratorComponent,
    ComponentsGeneratorComponent,
    FieldListComponent,
    ListGeneratorComponent,
    CodeComponent,
    DataComponent,
    FieldFormComponent
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
    TabViewModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
