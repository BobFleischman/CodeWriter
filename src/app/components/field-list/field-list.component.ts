import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {
  @Input()
  item: ItemObject;

  constructor() { }

  ngOnInit() {
  }

}
