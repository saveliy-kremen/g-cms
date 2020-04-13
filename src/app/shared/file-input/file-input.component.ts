import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Renderer2,
  EventEmitter,
  HostListener,
} from '@angular/core';

export type FileInputButtonType = 'basic' | 'raised' | 'stroked' | 'flat';

export interface FileReaderEventTarget extends EventTarget {
  result: string
}

export interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Input('id') public id: string;
  @Input('allowMultiple') public allowMultiple: boolean = false;
  @Input('accept') public accept: string;
  @Input('buttonType') public buttonType: FileInputButtonType = 'stroked';
  @Input('buttonText') public buttonText: string = 'Выберите файл';
  @Input('buttonColor') public buttonColor: string = 'gray';
  @Input('buttonTextColor') public buttonTextColor: string = 'white';
  @Input('noFileText') public noFileText: string = 'Файл не выбран';
  @Input('removeButtonLabel') public removeButtonLabel: string = 'Удалить';

  @Output('inputChange') public changeEvt: EventEmitter<Event> = new EventEmitter();
  @Output('clearClick') public clickEvt: EventEmitter<Event> = new EventEmitter();

  @ViewChild('realLabel') public realLabel: ElementRef<HTMLLabelElement>;
  @ViewChild('realInput') public realInput: ElementRef<HTMLInputElement>;
  @ViewChild('fakeBtn') public fakeBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('clearBtn') public clearBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('chips') public chips: ElementRef<HTMLDivElement>;

  public chipArray: HTMLSpanElement[] = [];

  constructor(
    public renderer: Renderer2
  ) { }

  public ngOnInit() {
    this.id = this.id ? this.id : `app-${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
  }

  @HostListener('document:dragover', ['$event']) public onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('document:drop', ['$event']) public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    const files: FileList = e.dataTransfer.files;

    this.renderer.setProperty(this.realInput.nativeElement, 'files', files);

    this.changeEvt.emit(e);
  }

  public handleRealInputChange(e: Event) {
    const files: FileList = (e.currentTarget as HTMLInputElement).files;
    this.handleFiles(files);

    this.changeEvt.emit(e);
  }

  public handleClearBtnClick(e: Event) {
    if (this.chipArray.length > 0) {
      this.renderer.setProperty(this.realInput.nativeElement, 'value', '');
      this.chipArray.forEach(chip => {
        this.renderer.removeChild(this.chips.nativeElement, chip);
      });
    }

    this.clickEvt.emit(e);
  }

  private handleFiles(files: FileList) {
    if (this.chipArray.length > 0) {
      this.chipArray.forEach(chip => {
        this.renderer.removeChild(this.chips.nativeElement, chip);
      });
    }

    if (files.length) {
      Array.from(files).forEach(file => {
        const chip = (this.renderer.createElement('SPAN') as HTMLSpanElement);
        this.renderer.addClass(chip, 'chip');

        chip.textContent = file.name;

        this.renderer.appendChild(this.chips.nativeElement, chip);

        this.chipArray.push(chip);
      })
    }
  }
}