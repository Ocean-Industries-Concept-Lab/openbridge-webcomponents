import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';


import type {ObcElevatedCardRadioGroup as ObcElevatedCardRadioGroupElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card-radio-group/elevated-card-radio-group.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card-radio-group/elevated-card-radio-group.js';

@Component({
  selector: 'obc-elevated-card-radio-group',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcElevatedCardRadioGroup {
  private _el: ObcElevatedCardRadioGroupElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcElevatedCardRadioGroupElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('change', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.changeEvent.emit(e);
    });
    
  }

  
  @Input()
  set options(v: { label: string; value: string; }[]) {
    this._ngZone.runOutsideAngular(() => (this._el.options = v));
  }

  get options() {
    return this._el.options;
  }
  
  @Input()
  set name(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.name = v));
  }

  get name() {
    return this._el.name;
  }
  
  @Input()
  set value(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
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
  set top(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.top = v));
  }

  get top() {
    return this._el.top;
  }
  

  
  @Output()
  changeEvent = new EventEmitter<unknown>();
  
}

