import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMoreVerticalGoogle as ObiMoreVerticalGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-more-vertical-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-more-vertical-google.js';

@Component({
  selector: 'obi-more-vertical-google',
  template: '<ng-content></ng-content>',
})
export class ObiMoreVerticalGoogle {
  private _el: ObiMoreVerticalGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMoreVerticalGoogleElement>,
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

