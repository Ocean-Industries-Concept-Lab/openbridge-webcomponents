import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKitesurfing as ObiKitesurfingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-kitesurfing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-kitesurfing.js';

@Component({
  selector: 'obi-kitesurfing',
  template: '<ng-content></ng-content>',
})
export class ObiKitesurfing {
  private _el: ObiKitesurfingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKitesurfingElement>,
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

