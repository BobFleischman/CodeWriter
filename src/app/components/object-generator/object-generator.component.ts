import { Component, OnInit, Input } from "@angular/core";
import { ItemObject } from "src/app/models/item-object";

@Component({
  selector: "app-object-generator",
  templateUrl: "./object-generator.component.html",
  styleUrls: ["./object-generator.component.css"]
})
export class ObjectGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;

  constructor() {}

  ngOnInit() {}

  generateFieldList(obj: ItemObject): string {
    let reslt = "";
    obj.fields.forEach(f => {
      const line = `${f.name}: ${f.type};\n`;
      reslt = reslt + line;
    });
    // console.log(reslt);
    return reslt.trim();
  }
}
