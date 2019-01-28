import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';

@Component({
  selector: 'app-list-generator',
  templateUrl: './list-generator.component.html',
  styleUrls: ['./list-generator.component.css']
})
export class ListGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;

  @Input()
  show: string;

  constructor() { }

  ngOnInit() {
  }

  showthis(type: string) {
    return type === this.show;
  }

  generateHTMLCode(obj: ItemObject): string {
    let result = `
    <p-table [value]="item.fields">
    <ng-template pTemplate="header">
        <tr>${this.getTH(obj)}</tr>
    </ng-template>
    <ng-template pTemplate="body" let-field>
        <tr>${this.getTD(obj)}</tr>
    </ng-template>
</p-table>
    `;
  return result;
  }

  getTH(obj:ItemObject): string {
    let result = "";
    obj.fields.forEach(element => {
      result = result + `<th>${element.label}</th>`
    });
    return result;
  }

  getTD(obj:ItemObject): string {
    let result = "";
    obj.fields.forEach(element => {
      result = result + `<td>{{field.${element.name}}}</td>`
    });
    return result;
  }
}
