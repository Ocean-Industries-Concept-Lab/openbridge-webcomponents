import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenFullExitGoogle as ObiScreenFullExitGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-full-exit-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-full-exit-google.js';

@Component({
  selector: 'obi-screen-full-exit-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiScreenFullExitGoogle {
  private _el: ObiScreenFullExitGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenFullExitGoogleElement>,
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

