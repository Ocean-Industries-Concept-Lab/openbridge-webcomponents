import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipSailship as ObiShipSailshipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-sailship.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-sailship.js';

@Component({
  selector: 'obi-ship-sailship',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipSailship {
  private _el: ObiShipSailshipElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipSailshipElement>,
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

