import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenShot as ObiScreenShotElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-shot.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-shot.js';

@Component({
  selector: 'obi-screen-shot',
  template: '<ng-content></ng-content>',
})
export class ObiScreenShot {
  private _el: ObiScreenShotElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenShotElement>,
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

