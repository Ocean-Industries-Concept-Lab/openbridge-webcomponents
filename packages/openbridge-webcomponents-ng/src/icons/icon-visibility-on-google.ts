import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVisibilityOnGoogle as ObiVisibilityOnGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-visibility-on-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-visibility-on-google.js';

@Component({
  selector: 'obi-visibility-on-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiVisibilityOnGoogle {
  private _el: ObiVisibilityOnGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVisibilityOnGoogleElement>,
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

