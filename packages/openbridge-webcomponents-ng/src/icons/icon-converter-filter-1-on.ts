import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterFilter1On as ObiConverterFilter1OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-filter-1-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-filter-1-on.js';

@Component({
  selector: 'obi-converter-filter-1-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConverterFilter1On {
  private _el: ObiConverterFilter1OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterFilter1OnElement>,
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

