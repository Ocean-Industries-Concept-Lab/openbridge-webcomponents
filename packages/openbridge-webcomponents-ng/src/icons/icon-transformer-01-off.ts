import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer01Off as ObiTransformer01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01-off.js';

@Component({
  selector: 'obi-transformer-01-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTransformer01Off {
  private _el: ObiTransformer01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer01OffElement>,
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

