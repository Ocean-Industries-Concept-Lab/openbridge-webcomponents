import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMegamenuGoogle as ObiMegamenuGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-megamenu-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-megamenu-google.js';

@Component({
  selector: 'obi-megamenu-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMegamenuGoogle {
  private _el: ObiMegamenuGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMegamenuGoogleElement>,
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

