import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowUpGoogle as ObiArrowUpGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-up-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-up-google.js';

@Component({
  selector: 'obi-arrow-up-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiArrowUpGoogle {
  private _el: ObiArrowUpGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowUpGoogleElement>,
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

