import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';


import type {ObcSelect as ObcSelectElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/select/select.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/select/select.js';

@Component({
  selector: 'obc-select',
  template: '<ng-content></ng-content>',
})
export class ObcSelect {
  private _el: ObcSelectElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcSelectElement>,
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
  set options(v: { value: string; label: string; level?: number | undefined; }[]) {
    this._ngZone.runOutsideAngular(() => (this._el.options = v));
  }

  get options() {
    return this._el.options;
  }
  
  @Input()
  set value(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set fullWidth(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.fullWidth = v));
  }

  get fullWidth() {
    return this._el.fullWidth;
  }
  

  
  @Output()
  changeEvent = new EventEmitter<unknown>();
  
}

