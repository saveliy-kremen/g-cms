import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { Message } from 'src/app/shared/models/message.model';
import { CategoryGrpcService } from 'src/app/shared/services/grpc/category.service';
import { ItemGrpcService } from 'src/app/shared/services/grpc/item.service';

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
    private itemService: ItemGrpcService,
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
      this.xmlImportData = this.xmlToJson(oDOM)["yml_catalog"][1]["shop"];
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
    console.log(this.xmlImportData)
    try {
      for (let i = 0; i < this.xmlImportData.categories.category.length; i++) {
        this.xmlImportData.categories.category[i].title = this.xmlImportData.categories.category[i]["#text"]
        this.xmlImportData.categories.category[i].parentID = this.xmlImportData.categories.category[i]["@attributes"].parentId
          ? Number(this.xmlImportData.categories.category.filter(item => item["@attributes"].id == this.xmlImportData.categories.category[i]["@attributes"].parentId)[0].id)
          : 0
        const res: any = await this.categoryService.uploadCategory(this.xmlImportData.categories.category[i]).toPromise()
        this.xmlImportData.categories.category[i].id = res.category.id
      }
      for (let i = 0; i < (this.xmlImportData.offers.offer.length ? 10 : 10); i++) {
        this.xmlImportData.offers.offer[i].title = this.xmlImportData.offers.offer[i].name["#text"]
        if (this.xmlImportData.offers.offer[i]["@attributes"].group_id) {
          const parentItem = this.xmlImportData.offers.offer.filter(item => item["@attributes"].id == this.xmlImportData.offers.offer[i]["@attributes"].group_id)[0]
          if (parentItem) {
            this.xmlImportData.offers.offer[i].parentID = parentItem.id
          }
        }
        this.xmlImportData.offers.offer[i].price = this.xmlImportData.offers.offer[i].price["#text"]
        this.xmlImportData.offers.offer[i].currency = this.xmlImportData.offers.offer[i].currencyId["#text"]
        if (this.xmlImportData.offers.offer[i].categoryId) {
          const category = this.xmlImportData.categories.category.filter(item => item["@attributes"].id == this.xmlImportData.offers.offer[i].categoryId["#text"])[0]
          if (category) {
            this.xmlImportData.offers.offer[i].categoryID = category.id
          }
        }
        this.xmlImportData.offers.offer[i].description = this.xmlImportData.offers.offer[i].description["#cdata-section"]
        this.xmlImportData.offers.offer[i].images = this.xmlImportData.offers.offer[i].picture.map(item => item["#text"])
        const res: any = await this.itemService.uploadOffer(this.xmlImportData.offers.offer[i]).toPromise()
        this.xmlImportData.offers.offer[i].id = res.item.id
      }
    } catch (err) {
      console.log(err)
      this.xmlMessage = new Message("danger", err.message);
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
    } else if (xml.nodeType == 3 || xml.nodeType == 4) { // text || CDATA
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
