import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowLeftGoogle as ObiArrowLeftGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-left-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-left-google.js';

@Component({
  selector: 'obi-arrow-left-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiArrowLeftGoogle {
  private _el: ObiArrowLeftGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowLeftGoogleElement>,
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

