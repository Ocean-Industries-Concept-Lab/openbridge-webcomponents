import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayDigitalOpen as ObiTwowayDigitalOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-open.js';

@Component({
  selector: 'obi-twoway-digital-open',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayDigitalOpen {
  private _el: ObiTwowayDigitalOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayDigitalOpenElement>,
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

