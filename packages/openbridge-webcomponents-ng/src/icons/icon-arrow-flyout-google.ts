import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowFlyoutGoogle as ObiArrowFlyoutGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-flyout-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-flyout-google.js';

@Component({
  selector: 'obi-arrow-flyout-google',
  template: '<ng-content></ng-content>',
})
export class ObiArrowFlyoutGoogle {
  private _el: ObiArrowFlyoutGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowFlyoutGoogleElement>,
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

