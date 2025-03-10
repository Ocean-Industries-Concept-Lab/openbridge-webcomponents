import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVolumeOff as ObiVolumeOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume-off.js';

@Component({
  selector: 'obi-volume-off',
  template: '<ng-content></ng-content>',
})
export class ObiVolumeOff {
  private _el: ObiVolumeOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVolumeOffElement>,
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

