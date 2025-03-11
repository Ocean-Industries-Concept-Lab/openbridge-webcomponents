import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipNavy as ObiShipNavyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-navy.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-navy.js';

@Component({
  selector: 'obi-ship-navy',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipNavy {
  private _el: ObiShipNavyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipNavyElement>,
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

