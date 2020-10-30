import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { Message } from 'src/app/shared/models/message.model';
import { AdminCategoryGrpcService } from 'src/app/shared/services/grpc/admin-category.service';
import { AdminItemGrpcService } from 'src/app/shared/services/grpc/admin-item.service';
import { AdminPropertyGrpcService } from 'src/app/shared/services/grpc/admin-property.service';

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
  loaderVisible: boolean
  loaderValue: number = 0
  categoriesMap: Map<string, string> = new Map();
  offersMap: Map<string, string> = new Map();
  breakID: number = 0;

  constructor(
    private loaderService: LoaderService,
    private adminCategoryService: AdminCategoryGrpcService,
    private adminItemService: AdminItemGrpcService,
    private adminPropertyService: AdminPropertyGrpcService,
  ) { }

  ngOnInit(): void {
  }

  uploadListener($event: any): void {
    this.loaderService.showLoader()

    let input = $event.target;
    let reader = new FileReader();
    if (input.files.length > 0) {
      if (this.coding === "windows1251") {
        reader.readAsText(input.files[0], "windows-1251");
      } else {
        reader.readAsText(input.files[0]);
      }
    } else {
      this.loadDisabled = true
      this.xmlImportData = null
      this.loaderService.hideLoader()
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
    this.loaderVisible = true
    this.categoriesMap = new Map();
    this.offersMap = new Map();
    //console.log(this.xmlImportData)
    let loadItemsPart = 100 / (this.xmlImportData.categories.category.length + this.xmlImportData.offers.offer.length)
    try {
      ///categories
      for (let i = 0; i < this.xmlImportData.categories.category.length; i++) {
        this.xmlImportData.categories.category[i].title = this.xmlImportData.categories.category[i]?.["#text"]
        this.xmlImportData.categories.category[i].parentID = this.xmlImportData.categories.category[i]["@attributes"]?.parentId && this.categoriesMap.has(this.xmlImportData.categories.category[i]["@attributes"].parentId)
          ? Number(this.categoriesMap.get(this.xmlImportData.categories.category[i]["@attributes"].parentId))
          : 0
        const res: any = await this.adminCategoryService.uploadCategory(this.xmlImportData.categories.category[i]).toPromise()
        this.categoriesMap.set(this.xmlImportData.categories.category[i]["@attributes"].id, res.category.id)
        this.loaderValue += loadItemsPart
      }
      ///offers
      for (let i = 0; i < this.xmlImportData.offers.offer.length; i++) {
        this.breakID = i;
        // if (this.xmlImportData.offers.offer[i]["@attributes"].id != 10068) continue
        // else {
        //   console.log(this.xmlImportData.offers.offer[i])
        // }
        let categoryID = this.xmlImportData.offers.offer[i].categoryId
        if (Array.isArray(categoryID)) {
          categoryID = categoryID[0]
        }
        const offerTitle = this.xmlImportData.offers.offer[i].name?.["#text"] || this.xmlImportData.offers.offer[i].model?.["#text"]
        const parentKey = this.xmlImportData.offers.offer[i]["@attributes"].group_id ?
          this.xmlImportData.offers.offer[i]["@attributes"].group_id : offerTitle
        if (this.offersMap.has(parentKey)) {
          this.xmlImportData.offers.offer[i].parentID = Number(this.offersMap.get(parentKey))
        } else {
          let parentOffer = Object.assign({}, this.xmlImportData.offers.offer[i])
          parentOffer.categoryID = categoryID && this.categoriesMap.has(categoryID["#text"])
            ? Number(this.categoriesMap.get(categoryID["#text"]))
            : 0
          parentOffer.title = offerTitle.replace(/\s*\([^(]*?\)\s*$/g, '')
          parentOffer.vendor = this.xmlImportData.offers.offer[i].vendor?.["#text"]
          parentOffer.currency = this.xmlImportData.offers.offer[i].currencyId?.["#text"]
          parentOffer.country = this.xmlImportData.offers.offer[i].country?.["#text"]
          parentOffer.price = this.xmlImportData.offers.offer[i].price?.["#text"]
          const res: any = await this.adminItemService.uploadOffer(parentOffer).toPromise()
          this.offersMap.set(parentKey, res.item.id)
          this.xmlImportData.offers.offer[i].parentID = Number(res.item.id)
        }
        this.xmlImportData.offers.offer[i].title = offerTitle
        this.xmlImportData.offers.offer[i].article = this.xmlImportData.offers.offer[i].vendorCode?.["#text"]
        this.xmlImportData.offers.offer[i].vendor = this.xmlImportData.offers.offer[i].vendor?.["#text"]
        this.xmlImportData.offers.offer[i].country = this.xmlImportData.offers.offer[i].country?.["#text"]
        this.xmlImportData.offers.offer[i].price = this.xmlImportData.offers.offer[i].price?.["#text"]
        this.xmlImportData.offers.offer[i].currency = this.xmlImportData.offers.offer[i].currencyId?.["#text"]
        this.xmlImportData.offers.offer[i].description = this.xmlImportData.offers.offer[i].description?.["#cdata-section"]
        this.xmlImportData.offers.offer[i].inStock = this.xmlImportData.offers.offer[i].available?.["#text"] ?? false
        if (this.xmlImportData.offers.offer[i].picture?.length > 0) {
          this.xmlImportData.offers.offer[i].images = this.xmlImportData.offers.offer[i].picture.map(item => item["#text"])
        } else if (this.xmlImportData.offers.offer[i].picture?.["#text"]) {
          this.xmlImportData.offers.offer[i].images = [this.xmlImportData.offers.offer[i].picture["#text"]]
        }
        const res: any = await this.adminItemService.uploadOffer(this.xmlImportData.offers.offer[i]).toPromise()
        this.offersMap.set(this.xmlImportData.offers.offer[i]["@attributes"].id, res.item.id)
        ///params
        if (this.xmlImportData.offers.offer[i].param?.length > 0) {
          for (let j = 0; j < this.xmlImportData.offers.offer[i].param?.length; j++) {
            this.xmlImportData.offers.offer[i].param[j].title = this.xmlImportData.offers.offer[i].param[j]["@attributes"].name
            this.xmlImportData.offers.offer[i].param[j].value = this.xmlImportData.offers.offer[i].param[j]["#text"]
            this.xmlImportData.offers.offer[i].param[j].itemID = res.item.id
            await this.adminPropertyService.uploadProperty(this.xmlImportData.offers.offer[i].param[j]).toPromise()
          }
        } else if (this.xmlImportData.offers.offer[i].param) {
          this.xmlImportData.offers.offer[i].param.title = this.xmlImportData.offers.offer[i].param["@attributes"].name
          this.xmlImportData.offers.offer[i].param.value = this.xmlImportData.offers.offer[i].param["#text"]
          this.xmlImportData.offers.offer[i].param.itemID = res.item.id
          await this.adminPropertyService.uploadProperty(this.xmlImportData.offers.offer[i].param).toPromise()
        }
        this.loaderValue += loadItemsPart
      }
    } catch (err) {
      console.log(this.breakID, this.xmlImportData.offers.offer[this.breakID])
      console.log(err)
      this.xmlMessage = new Message("danger", err.message);
    }
    this.loaderValue = 0
    this.loaderVisible = false
  }

  fileReset() {
    this.xmlImportData = null;
    this.xmlMessage = new Message("success", "")
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
