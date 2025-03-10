import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrackNo as ObiTrackNoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-no.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-no.js';

@Component({
  selector: 'obi-track-no',
  template: '<ng-content></ng-content>',
})
export class ObiTrackNo {
  private _el: ObiTrackNoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrackNoElement>,
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

