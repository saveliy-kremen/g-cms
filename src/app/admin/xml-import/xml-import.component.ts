import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xml-import',
  templateUrl: './xml-import.component.html',
  styleUrls: ['./xml-import.component.scss']
})
export class XmlImportComponent implements OnInit {
  xmlImportData: any
  public coding: string = "utf8"

  constructor() { }

  ngOnInit(): void {
  }

  uploadListener($event: any): void {
    let files = $event.srcElement.files;

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
      console.log(reader.result)
      this.xmlImportData = this.xmlToJson(oDOM);
      console.log(this.xmlImportData)
    };

    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };
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
