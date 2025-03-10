import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDeleteFilledGoogle as ObiDeleteFilledGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delete-filled-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delete-filled-google.js';

@Component({
  selector: 'obi-delete-filled-google',
  template: '<ng-content></ng-content>',
})
export class ObiDeleteFilledGoogle {
  private _el: ObiDeleteFilledGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDeleteFilledGoogleElement>,
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

