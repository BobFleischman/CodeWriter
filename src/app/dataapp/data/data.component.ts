import { Component, OnInit } from '@angular/core';
import { ItemObjectService } from 'src/app/service/item-object.service';
import { ItemObject } from 'src/app/models/item-object';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  item: ItemObject;
  displayDialog = false;
  newField = false;
  cloneField = new Field();
  selectedField = new Field();

  constructor(private itemService: ItemObjectService) {
    this.itemService.getItemObject().subscribe(data => {
      this.item = data;
    });
  }

  ngOnInit() {
  }

  onRowSelect(event) {
    console.log('In on Row Select ' + JSON.stringify(event.data));
    this.newField = false;
    this.cloneField = this.cloneThisField(event.data);
    console.log(JSON.stringify(this.cloneField));
    this.displayDialog = true;
  }

  cloneThisField(c: Field): Field {
    let field = new Field();
    for (let prop in c) {
      field[prop] = c[prop];
    }
    return field;
  }

}
