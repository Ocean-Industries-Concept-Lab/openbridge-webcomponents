import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCheckboxChecked as ObiCheckboxCheckedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-checked.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-checked.js';

@Component({
  selector: 'obi-checkbox-checked',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCheckboxChecked {
  private _el: ObiCheckboxCheckedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCheckboxCheckedElement>,
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

