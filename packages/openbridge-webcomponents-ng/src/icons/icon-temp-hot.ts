import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTempHot as ObiTempHotElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-hot.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-hot.js';

@Component({
  selector: 'obi-temp-hot',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTempHot {
  private _el: ObiTempHotElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTempHotElement>,
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

