import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTransformer01On as ObiTransformer01OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-transformer-01-on.js';

@Component({
  selector: 'obi-transformer-01-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTransformer01On {
  private _el: ObiTransformer01OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTransformer01OnElement>,
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

