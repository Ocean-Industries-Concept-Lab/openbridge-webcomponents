import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVoyages as ObiVoyagesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-voyages.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-voyages.js';

@Component({
  selector: 'obi-voyages',
  template: '<ng-content></ng-content>',
})
export class ObiVoyages {
  private _el: ObiVoyagesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVoyagesElement>,
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

