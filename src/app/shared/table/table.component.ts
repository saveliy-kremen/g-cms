import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  template: `
  <table mat-table [dataSource]="dataSource" style="width: 100%;">
    <!-- Columns definition -->
    <ng-container *ngFor="let column of columnDefs; let i = index" matColumnDef="{{column}}" [sticky]="i == 0">
        <th mat-header-cell *matHeaderCellDef>{{column}}</th>
        <td mat-cell *matCellDef="let element" [innerHTML]="element[column] | safeHtml"></td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" [length]="length" (page)="changePage($event)"
    showFirstLastButtons>
  </mat-paginator>
  `,
  styles: [
    `.mat-table-sticky:first-child {
      border-right: 1px solid #e0e0e0;
    }
    th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type {
      padding-left: 10px;
    }
    th.mat-header-cell, td.mat-cell, td.mat-footer-cell {
      padding-left: 10px;
      padding-right: 10px;
    }
    .mat-column-position {
        width: 30px;
    }
    :host /deep/ .glyphicon-edit {
      color: #9c27b0;
    }
    :host /deep/ .glyphicon-trash {
      color: red;
    }
    `
  ]
})
export class TableComponent {
  @Input()
  columnDefs: any

  @Input()
  displayedColumns: any

  @Input()
  dataSource: any

  @Input()
  length: number

  @Output()
  changePageHandler = new EventEmitter<number>();

  @Input()
  actions: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(private router: Router) {
  }

  changePage($event) {
    this.changePageHandler.emit($event)
  }
}
