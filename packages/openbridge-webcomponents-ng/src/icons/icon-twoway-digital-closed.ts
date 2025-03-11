import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayDigitalClosed as ObiTwowayDigitalClosedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-closed.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-closed.js';

@Component({
  selector: 'obi-twoway-digital-closed',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayDigitalClosed {
  private _el: ObiTwowayDigitalClosedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayDigitalClosedElement>,
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

