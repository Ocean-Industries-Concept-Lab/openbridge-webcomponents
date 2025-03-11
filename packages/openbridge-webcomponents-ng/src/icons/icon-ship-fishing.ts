import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiShipFishing as ObiShipFishingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-fishing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ship-fishing.js';

@Component({
  selector: 'obi-ship-fishing',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiShipFishing {
  private _el: ObiShipFishingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiShipFishingElement>,
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

