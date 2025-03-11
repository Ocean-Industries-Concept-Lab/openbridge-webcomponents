import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {HTMLInputTypeAttribute, ObcInputTextAlign, ObcInputFont} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/input/input.js';
export type {HTMLInputTypeAttribute, ObcInputTextAlign, ObcInputFont} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/input/input.js';
import type {ObcInput as ObcInputElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/input/input.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/input/input.js';

@Component({
  selector: 'obc-input',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcInput {
  private _el: ObcInputElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcInputElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('input', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.inputEvent.emit(e);
    });
    
  }

  
  @Input()
  set value(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set placeholder(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.placeholder = v));
  }

  get placeholder() {
    return this._el.placeholder;
  }
  
  @Input()
  set type(v: HTMLInputTypeAttribute) {
    this._ngZone.runOutsideAngular(() => (this._el.type = v));
  }

  get type() {
    return this._el.type;
  }
  
  @Input()
  set squared(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.squared = v));
  }

  get squared() {
    return this._el.squared;
  }
  
  @Input()
  set textAlign(v: ObcInputTextAlign) {
    this._ngZone.runOutsideAngular(() => (this._el.textAlign = v));
  }

  get textAlign() {
    return this._el.textAlign;
  }
  
  @Input()
  set font(v: ObcInputFont) {
    this._ngZone.runOutsideAngular(() => (this._el.font = v));
  }

  get font() {
    return this._el.font;
  }
  
  @Input()
  set disabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disabled = v));
  }

  get disabled() {
    return this._el.disabled;
  }
  
  @Input()
  set required(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.required = v));
  }

  get required() {
    return this._el.required;
  }
  
  @Input()
  set error(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.error = v));
  }

  get error() {
    return this._el.error;
  }
  
  @Input()
  set noHorisontalPadding(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.noHorisontalPadding = v));
  }

  get noHorisontalPadding() {
    return this._el.noHorisontalPadding;
  }
  

  
  @Output()
  inputEvent = new EventEmitter<unknown>();
  
}

