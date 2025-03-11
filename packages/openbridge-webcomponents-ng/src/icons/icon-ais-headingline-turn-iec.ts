import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisHeadinglineTurnIec as ObiAisHeadinglineTurnIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-headingline-turn-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-headingline-turn-iec.js';

@Component({
  selector: 'obi-ais-headingline-turn-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisHeadinglineTurnIec {
  private _el: ObiAisHeadinglineTurnIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisHeadinglineTurnIecElement>,
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

