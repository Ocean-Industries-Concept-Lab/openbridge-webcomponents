import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer02On as ObiTransformer02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02-on.js';

@Component({
  selector: 'obi-transformer-02-on',
  template: '<ng-content></ng-content>',
})
export class ObiTransformer02On {
  private _el: ObiTransformer02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer02OnElement>,
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

