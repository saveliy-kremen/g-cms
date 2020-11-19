import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public saveTable(page: string, table: string) {
    localStorage.setItem('table', JSON.stringify({ page: page, table: table }))
  }

  public getTable(page: string) {
    const tableJSON = localStorage.getItem('table')
    const table = JSON.parse(tableJSON)
    if (table && table.page == page) {
      return JSON.parse(table.table)
    }
    localStorage.removeItem("table")
    return null
  }
}
