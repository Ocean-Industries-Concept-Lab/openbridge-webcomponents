import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrackOffStrb as ObiTrackOffStrbElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-off-strb.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-off-strb.js';

@Component({
  selector: 'obi-track-off-strb',
  template: '<ng-content></ng-content>',
})
export class ObiTrackOffStrb {
  private _el: ObiTrackOffStrbElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrackOffStrbElement>,
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

