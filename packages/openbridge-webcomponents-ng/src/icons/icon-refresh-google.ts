import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRefreshGoogle as ObiRefreshGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-refresh-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-refresh-google.js';

@Component({
  selector: 'obi-refresh-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRefreshGoogle {
  private _el: ObiRefreshGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRefreshGoogleElement>,
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

