import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterDcac as ObiConverterDcacElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac.js';

@Component({
  selector: 'obi-converter-dcac',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConverterDcac {
  private _el: ObiConverterDcacElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterDcacElement>,
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

