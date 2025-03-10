import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMeasureGoogle as ObiMeasureGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-measure-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-measure-google.js';

@Component({
  selector: 'obi-measure-google',
  template: '<ng-content></ng-content>',
})
export class ObiMeasureGoogle {
  private _el: ObiMeasureGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMeasureGoogleElement>,
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

