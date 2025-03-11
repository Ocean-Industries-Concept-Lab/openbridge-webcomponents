import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCheckboxCheckedFilled as ObiCheckboxCheckedFilledElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-checked-filled.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-checked-filled.js';

@Component({
  selector: 'obi-checkbox-checked-filled',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCheckboxCheckedFilled {
  private _el: ObiCheckboxCheckedFilledElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCheckboxCheckedFilledElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

