import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEngineFill as ObiEngineFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-engine-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-engine-fill.js';

@Component({
  selector: 'obi-engine-fill',
  template: '<ng-content></ng-content>',
})
export class ObiEngineFill {
  private _el: ObiEngineFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEngineFillElement>,
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

