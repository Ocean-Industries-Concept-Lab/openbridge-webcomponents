import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVisibilityOffGoogle as ObiVisibilityOffGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-visibility-off-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-visibility-off-google.js';

@Component({
  selector: 'obi-visibility-off-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiVisibilityOffGoogle {
  private _el: ObiVisibilityOffGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVisibilityOffGoogleElement>,
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

