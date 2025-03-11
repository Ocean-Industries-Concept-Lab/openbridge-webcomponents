import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOpenSea as ObiOpenSeaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-open-sea.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-open-sea.js';

@Component({
  selector: 'obi-open-sea',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOpenSea {
  private _el: ObiOpenSeaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOpenSeaElement>,
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

