import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAuto as ObiAutoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-auto.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-auto.js';

@Component({
  selector: 'obi-auto',
  template: '<ng-content></ng-content>',
})
export class ObiAuto {
  private _el: ObiAutoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAutoElement>,
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

