import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntenna2 as ObiAntenna2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2.js';

@Component({
  selector: 'obi-antenna-2',
  template: '<ng-content></ng-content>',
})
export class ObiAntenna2 {
  private _el: ObiAntenna2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntenna2Element>,
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

