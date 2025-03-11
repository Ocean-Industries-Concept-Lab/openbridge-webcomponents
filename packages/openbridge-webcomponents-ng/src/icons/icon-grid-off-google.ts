import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGridOffGoogle as ObiGridOffGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-grid-off-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-grid-off-google.js';

@Component({
  selector: 'obi-grid-off-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGridOffGoogle {
  private _el: ObiGridOffGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGridOffGoogleElement>,
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

