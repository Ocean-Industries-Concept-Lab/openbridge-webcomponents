import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTidalIec as ObiTidalIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tidal-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tidal-iec.js';

@Component({
  selector: 'obi-tidal-iec',
  template: '<ng-content></ng-content>',
})
export class ObiTidalIec {
  private _el: ObiTidalIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTidalIecElement>,
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

