import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, DoCheck, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, CanUpdateErrorStateCtor, mixinErrorState } from "@angular/material/core";
import { MatFormFieldControl } from '@angular/material/form-field';
import { QuillEditorComponent } from 'ngx-quill';
import { Subscription } from 'rxjs';

/* class is used in custom material form field component/wrapper 
    provide material functionality to work with erorsState & ErrorStateMatcher  */
export class CustomErrorStateBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) { }
}

/* mixinErrorState - material function that appy logic related with material forms errors  */
export const CustomErrorStateMixin: CanUpdateErrorStateCtor & typeof CustomErrorStateBase = mixinErrorState(CustomErrorStateBase);


/* Class is use to insert quill-editor(ngx-quill) inside of the material form field */
@Directive({
  selector: '[customRichEditor]',
  providers: [{ provide: MatFormFieldControl, useExisting: QuillFormFieldDirective }],
})
export class QuillFormFieldDirective extends CustomErrorStateMixin implements OnInit, OnDestroy, DoCheck, MatFormFieldControl<QuillFormFieldDirective>{

  _quillInstance: any;
  _quillSubscription: Subscription;

  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() public _parentForm: NgForm,
    @Optional() public _parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    quillEditor: QuillEditorComponent) {

    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    this._quillSubscription = quillEditor.onEditorCreated.subscribe((event) => this.quillEditorCreated(event));

    focusMonitor.monitor(elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._quillSubscription.unsubscribe();
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). 
      this.updateErrorState();
    }
  }

  quillEditorCreated($event) {
    this._quillInstance = $event;
  }

  private _value;
  set value(newValue: QuillFormFieldDirective | null) {
    this._value = newValue;
    this.stateChanges.next();
  }


  controlType = 'quill-wrapper-directive';
  static nextId = 0;
  @HostBinding() id = `${this.controlType}-id-${QuillFormFieldDirective.nextId++}`;
  focused: boolean;

  @Input()
  get placeholder() {

    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  get empty() {
    let isEmpty = true;;
    if (this._quillInstance) {
      // since quill always apply new line '/n' at the end of file, lenght === 1 means there is no text inside
      isEmpty = this._quillInstance.getLength() === 1;
    }
    return isEmpty;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  // this two properties are taken from base class: CustomErrorStateMixin - through material mixinErrorState
  // errorState = false;
  // stateChanges = new Subject<void>();

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
  }
}