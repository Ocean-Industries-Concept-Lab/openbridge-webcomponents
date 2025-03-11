import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalClosed as ObiThreewayDigitalClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed.js';

@Component({
  selector: 'obi-threeway-digital-closed',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayDigitalClosed {
  private _el: ObiThreewayDigitalClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalClosedElement>,
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

