import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDockRightGoogle as ObiDockRightGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-right-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dock-right-google.js';

@Component({
  selector: 'obi-dock-right-google',
  template: '<ng-content></ng-content>',
})
export class ObiDockRightGoogle {
  private _el: ObiDockRightGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDockRightGoogleElement>,
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

