import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShip as ObiShipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship.js';

@Component({
  selector: 'obi-ship',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShip {
  private _el: ObiShipElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipElement>,
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

