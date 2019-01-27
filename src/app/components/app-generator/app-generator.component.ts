import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field';
import { ItemObject } from 'src/app/models/item-object';

@Component({
  selector: 'app-app-generator',
  templateUrl: './app-generator.component.html',
  styleUrls: ['./app-generator.component.css']
})
export class AppGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;
  constructor() {}

  ngOnInit() {}

}
