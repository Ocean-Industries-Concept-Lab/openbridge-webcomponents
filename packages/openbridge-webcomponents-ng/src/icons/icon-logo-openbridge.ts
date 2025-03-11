import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogoOpenbridge as ObiLogoOpenbridgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logo-openbridge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logo-openbridge.js';

@Component({
  selector: 'obi-logo-openbridge',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogoOpenbridge {
  private _el: ObiLogoOpenbridgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogoOpenbridgeElement>,
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

