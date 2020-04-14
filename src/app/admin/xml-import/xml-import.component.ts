import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { Message } from 'src/app/shared/models/message.model';
import { CategoryGrpcService } from 'src/app/shared/services/grpc/category.service';

@Component({
  selector: 'app-xml-import',
  templateUrl: './xml-import.component.html',
  styleUrls: ['./xml-import.component.scss']
})
export class XmlImportComponent implements OnInit {
  xmlImportData: any
  public coding: string = "utf8"
  xmlMessage: Message = new Message("success", "")
  loadDisabled: boolean

  constructor(
    private loaderService: LoaderService,
    private categoryService: CategoryGrpcService,
  ) { }

  ngOnInit(): void {
  }

  uploadListener($event: any): void {
    this.loaderService.showLoader()

    let input = $event.target;
    let reader = new FileReader();
    if (this.coding === "windows1251") {
      reader.readAsText(input.files[0], "windows-1251");
    } else {
      reader.readAsText(input.files[0]);
    }

    reader.onload = () => {
      // Assuming xmlDoc is the XML DOM Document
      var oParser = new DOMParser();
      var oDOM = oParser.parseFromString(String(reader.result), "application/xml");
      //console.log(reader.result)
      this.xmlImportData = this.xmlToJson(oDOM)["yml_catalog"][1]["shop"];
      //console.log(this.xmlImportData)
      this.loadDisabled = false
      this.loaderService.hideLoader()
    };

    reader.onerror = function () {
      this.loaderService.hideLoader()
      this.xmlMessage = new Message("danger", 'Error is occured while reading file!');
    }.bind(this);
  }

  async loadData() {
    this.loadDisabled = true
    this.loaderService.showLoader()
    try {
      for (let i = 0; i < this.xmlImportData.categories.category.length; i++) {
        this.xmlImportData.categories.category[i].title = this.xmlImportData.categories.category[i]["#text"]
        this.xmlImportData.categories.category[i].parentID = this.xmlImportData.categories.category[i]["@attributes"].parentId
          ? Number(this.xmlImportData.categories.category.filter(item => item["@attributes"].id == this.xmlImportData.categories.category[i]["@attributes"].parentId)[0].id)
          : 0
        const res: any = await this.categoryService.uploadCategory(this.xmlImportData.categories.category[i]).toPromise()
        this.xmlImportData.categories.category[i].id = res.category.id
      }
    } catch (err) {
      this.xmlMessage = new Message("danger", err);
    }
    this.loaderService.hideLoader()
  }

  fileReset() {
    this.xmlImportData = null;
  }

  // Changes XML to JSON
  xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };
}
