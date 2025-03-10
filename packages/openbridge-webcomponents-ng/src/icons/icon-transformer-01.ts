import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer01 as ObiTransformer01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01.js';

@Component({
  selector: 'obi-transformer-01',
  template: '<ng-content></ng-content>',
})
export class ObiTransformer01 {
  private _el: ObiTransformer01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer01Element>,
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

