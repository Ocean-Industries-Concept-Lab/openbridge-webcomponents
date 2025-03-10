import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisHeadinglineIec as ObiAisHeadinglineIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-headingline-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-headingline-iec.js';

@Component({
  selector: 'obi-ais-headingline-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAisHeadinglineIec {
  private _el: ObiAisHeadinglineIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisHeadinglineIecElement>,
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

