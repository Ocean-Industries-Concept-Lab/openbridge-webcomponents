import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWhale as ObiWhaleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-whale.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-whale.js';

@Component({
  selector: 'obi-whale',
  template: '<ng-content></ng-content>',
})
export class ObiWhale {
  private _el: ObiWhaleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWhaleElement>,
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

