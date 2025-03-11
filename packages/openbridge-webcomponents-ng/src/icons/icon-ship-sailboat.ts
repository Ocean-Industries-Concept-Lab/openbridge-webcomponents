import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipSailboat as ObiShipSailboatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-sailboat.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-sailboat.js';

@Component({
  selector: 'obi-ship-sailboat',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipSailboat {
  private _el: ObiShipSailboatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipSailboatElement>,
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

