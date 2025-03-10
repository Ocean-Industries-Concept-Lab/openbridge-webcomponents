import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctGoingTo as ObiDuctGoingToElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-going-to.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-going-to.js';

@Component({
  selector: 'obi-duct-going-to',
  template: '<ng-content></ng-content>',
})
export class ObiDuctGoingTo {
  private _el: ObiDuctGoingToElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctGoingToElement>,
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

