import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiReorderGoogle as ObiReorderGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-reorder-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-reorder-google.js';

@Component({
  selector: 'obi-reorder-google',
  template: '<ng-content></ng-content>',
})
export class ObiReorderGoogle {
  private _el: ObiReorderGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiReorderGoogleElement>,
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

