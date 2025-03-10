import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrackOffPort as ObiTrackOffPortElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-off-port.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-track-off-port.js';

@Component({
  selector: 'obi-track-off-port',
  template: '<ng-content></ng-content>',
})
export class ObiTrackOffPort {
  private _el: ObiTrackOffPortElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrackOffPortElement>,
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

