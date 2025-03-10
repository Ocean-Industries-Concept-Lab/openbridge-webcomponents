import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTideHigh as ObiTideHighElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide-high.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide-high.js';

@Component({
  selector: 'obi-tide-high',
  template: '<ng-content></ng-content>',
})
export class ObiTideHigh {
  private _el: ObiTideHighElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTideHighElement>,
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

