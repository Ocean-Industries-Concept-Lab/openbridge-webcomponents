import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer02 as ObiTransformer02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02.js';

@Component({
  selector: 'obi-transformer-02',
  template: '<ng-content></ng-content>',
})
export class ObiTransformer02 {
  private _el: ObiTransformer02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer02Element>,
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

