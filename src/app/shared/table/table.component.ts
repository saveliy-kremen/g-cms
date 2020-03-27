import { Component, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  template: `
  <table mat-table matSortDisableClear matSort (matSortChange)="sortChange($event)" [dataSource]="data" style="width: 100%;">
    <!-- Columns definition -->

    <ng-container matColumnDef="position" sticky>
        <th mat-header-cell mat-sort-header *matHeaderCellDef>№</th>
        <td mat-cell *matCellDef="let element">{{element.position}}</td>
    </ng-container>

    <ng-container *ngFor="let column of columnDefs; let i = index" matColumnDef="{{column.column}}">
        <th mat-header-cell mat-sort-header [disabled]="!column.sort" *matHeaderCellDef>{{column.title | translate}}</th>
        <td mat-cell *matCellDef="let element" [innerHTML]="element[column.column] | safeHtml"></td>
    </ng-container>

    <ng-container matColumnDef="actions" stickyEnd>
      <th mat-header-cell *matHeaderCellDef>{{"Actions" | translate}}</th>
      <td mat-cell *matCellDef="let element">
        <button *ngFor="let action of element.actions" mat-icon-button>
          <mat-icon (click)="action.handler(action.id)" class="{{action.class}}">{{action.icon}}</mat-icon>
        </button>
      </td>
  </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="pageSizeOptions" [length]="length" (page)="changePage($event)"
    showFirstLastButtons>
  </mat-paginator>
  `,
  styles: [
    `.mat-table-sticky:first-child {
      border-right: 1px solid #e0e0e0;
      width: 30px;
    }
    .mat-table-sticky:last-child {
      border-left: 1px solid #e0e0e0;
      padding-right: 10px;
      padding-left: 10px;
      width: 120px;

    }
    th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type {
      padding-left: 10px;
    }
    th.mat-header-cell, td.mat-cell, td.mat-footer-cell {
      padding-left: 10px;
      padding-right: 10px;
    }
    .button-edit {
      color: #9c27b0;
    }
    .button-delete {
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
  changePageHandler = new EventEmitter<any>();

  @Input()
  actions: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  data: any
  pageSizeOptions = environment.pageSizeOptions
  pageIndex: number = 0
  pageSize: number = environment.pageSizeOptions[0]
  active: string = null
  direction: string = null

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.length) {
      this.table.renderRows()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource && this.dataSource) {
      if (this.active == "position") {
        this.data = this.dataSource.map((item, index) => {
          return {
            ...item, position: this.pageIndex * this.pageSize + index + 1,
          }
        }).sort(this.direction == "asc" ? compareNumericAsc : compareNumericDesc)
      } else {
        this.data = this.dataSource.map((item, index) => {
          return {
            ...item, position: this.pageIndex * this.pageSize + index + 1,
          }
        })
      }
    }
  }

  changePage($event) {
    this.pageIndex = $event.pageIndex
    this.pageSize = $event.pageSize
    this.changePageHandler.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize, sort: this.active != "position" ? this.active : null, direction: this.active != "position" ? this.direction : null })
  }

  sortChange($event) {
    this.active = $event.active
    this.direction = $event.direction
    if ($event.active == "position") {
      this.data.sort($event.direction == "asc" ? compareNumericAsc : compareNumericDesc);
    } else {
      this.changePageHandler.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize, sort: this.active, direction: this.direction })
    }
    this.table.renderRows()
  }
}

function compareNumericAsc(a, b) {
  if (Number(a.position) > Number(b.position)) return 1;
  if (Number(a.position) == Number(b.position)) return 0;
  if (Number(a.position) < Number(b.position)) return -1;
}

function compareNumericDesc(a, b) {
  if (Number(a.position) < Number(b.position)) return 1;
  if (Number(a.position) == Number(b.position)) return 0;
  if (Number(a.position) > Number(b.position)) return -1;
}

