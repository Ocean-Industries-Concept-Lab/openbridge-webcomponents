import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKeepingTrack as ObiKeepingTrackElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-track.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-track.js';

@Component({
  selector: 'obi-keeping-track',
  template: '<ng-content></ng-content>',
})
export class ObiKeepingTrack {
  private _el: ObiKeepingTrackElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKeepingTrackElement>,
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

