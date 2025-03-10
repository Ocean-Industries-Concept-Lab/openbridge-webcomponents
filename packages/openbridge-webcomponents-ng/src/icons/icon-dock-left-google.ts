import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDockLeftGoogle as ObiDockLeftGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-left-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-left-google.js';

@Component({
  selector: 'obi-dock-left-google',
  template: '<ng-content></ng-content>',
})
export class ObiDockLeftGoogle {
  private _el: ObiDockLeftGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDockLeftGoogleElement>,
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

