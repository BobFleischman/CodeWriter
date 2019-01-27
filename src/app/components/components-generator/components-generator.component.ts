import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';

@Component({
  selector: 'app-components-generator',
  templateUrl: './components-generator.component.html',
  styleUrls: ['./components-generator.component.css']
})
export class ComponentsGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;

  constructor() { }

  ngOnInit() {
  }

}
