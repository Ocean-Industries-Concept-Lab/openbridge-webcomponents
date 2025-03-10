import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDisplayBrillianceLow as ObiDisplayBrillianceLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-low.js';

@Component({
  selector: 'obi-display-brilliance-low',
  template: '<ng-content></ng-content>',
})
export class ObiDisplayBrillianceLow {
  private _el: ObiDisplayBrillianceLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDisplayBrillianceLowElement>,
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

