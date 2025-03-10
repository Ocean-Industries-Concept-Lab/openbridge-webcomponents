import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBlowerOffHorizontal as ObiBlowerOffHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-off-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-blower-off-horizontal.js';

@Component({
  selector: 'obi-blower-off-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiBlowerOffHorizontal {
  private _el: ObiBlowerOffHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBlowerOffHorizontalElement>,
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

