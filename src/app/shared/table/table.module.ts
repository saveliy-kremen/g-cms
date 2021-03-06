import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, TranslateParser } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { TableComponent } from './table.component';
import { MaterialModule } from '../material/material.module';
import { SafeHtmlPipe } from '../pipes/sanitize.pipe';

@Injectable()
export class LocalizeMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super()
    this.translateService.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();

  }

  getAndInitTranslations() {
    this.translateService.get([
      'PAGINATOR.ITEMS_PER_PAGE',
      'PAGINATOR.NEXT_PAGE',
      'PAGINATOR.PREVIOUS_PAGE',
      'PAGINATOR.RANGE',
      'PAGINATOR.OF'
    ])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.firstPageLabel = translation['PAGINATOR.FIRST_PAGE'];
        this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE'];
        this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE'];
        this.lastPageLabel = translation['PAGINATOR.LAST_PAGE'];
        this.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length == 0 || pageSize == 0) {
            return `0 ${translation['PAGINATOR.OF']} ${length}`;
          }
          length = Math.max(length, 0);
          const startIndex = page * pageSize;
          const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
          return `${startIndex + 1} – ${endIndex} ${translation['PAGINATOR.OF']} ${length}`;
        }
        this.changes.next();
      });
  }
}

@NgModule({
  declarations: [TableComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: LocalizeMatPaginatorIntl }
  ],
  exports: [TableComponent]
})
export class TableModule { }
