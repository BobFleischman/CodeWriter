import { Component, OnInit } from "@angular/core";
import { ItemObject } from "src/app/models/item-object";
import { Field } from "src/app/models/field";
import { ItemObjectService } from "src/app/service/item-object.service";

@Component({
  selector: "app-code",
  templateUrl: "./code.component.html",
  styleUrls: ["./code.component.css"]
})
export class CodeComponent implements OnInit {
  item: ItemObject;
  constructor(private itemService: ItemObjectService) {
    this.itemService.getItemObject().subscribe(data => {
      this.item = data;
    });
  }

  ngOnInit() {}
}
