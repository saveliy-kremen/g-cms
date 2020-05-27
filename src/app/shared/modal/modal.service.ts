import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog
  ) { }

  showModal(data: any) {
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(ModalComponent, { data });
      dialogRef.afterClosed().subscribe(result => { data.callBackFunction(result) });
    })
  }
}
