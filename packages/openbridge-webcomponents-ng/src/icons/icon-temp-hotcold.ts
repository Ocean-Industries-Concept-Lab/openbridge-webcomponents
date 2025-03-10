import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTempHotcold as ObiTempHotcoldElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-hotcold.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temp-hotcold.js';

@Component({
  selector: 'obi-temp-hotcold',
  template: '<ng-content></ng-content>',
})
export class ObiTempHotcold {
  private _el: ObiTempHotcoldElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTempHotcoldElement>,
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

