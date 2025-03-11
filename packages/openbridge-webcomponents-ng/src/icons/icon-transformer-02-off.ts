import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer02Off as ObiTransformer02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-02-off.js';

@Component({
  selector: 'obi-transformer-02-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTransformer02Off {
  private _el: ObiTransformer02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer02OffElement>,
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

