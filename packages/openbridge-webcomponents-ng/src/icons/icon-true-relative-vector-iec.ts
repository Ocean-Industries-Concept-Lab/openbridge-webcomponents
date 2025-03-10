import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrueRelativeVectorIec as ObiTrueRelativeVectorIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-true-relative-vector-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-true-relative-vector-iec.js';

@Component({
  selector: 'obi-true-relative-vector-iec',
  template: '<ng-content></ng-content>',
})
export class ObiTrueRelativeVectorIec {
  private _el: ObiTrueRelativeVectorIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrueRelativeVectorIecElement>,
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

