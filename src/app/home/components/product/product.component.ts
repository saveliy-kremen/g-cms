import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  uploadUrl = environment.siteUrl + "/uploads/"
  @Input() product

  constructor() { }

  ngOnInit() {
  }
}
