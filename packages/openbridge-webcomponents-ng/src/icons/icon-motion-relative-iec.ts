import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotionRelativeIec as ObiMotionRelativeIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-relative-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-relative-iec.js';

@Component({
  selector: 'obi-motion-relative-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMotionRelativeIec {
  private _el: ObiMotionRelativeIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotionRelativeIecElement>,
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

