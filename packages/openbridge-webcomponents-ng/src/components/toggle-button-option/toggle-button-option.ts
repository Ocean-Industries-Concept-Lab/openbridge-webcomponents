import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcToggleButtonOption as ObcToggleButtonOptionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js';

@Component({
  selector: 'obc-toggle-button-option',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcToggleButtonOption {
  private _el: ObcToggleButtonOptionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcToggleButtonOptionElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set value(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set selected(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.selected = v));
  }

  get selected() {
    return this._el.selected;
  }
  

  
}

