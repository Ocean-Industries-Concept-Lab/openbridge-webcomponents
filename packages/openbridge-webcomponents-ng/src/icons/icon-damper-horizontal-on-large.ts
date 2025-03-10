import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDamperHorizontalOnLarge as ObiDamperHorizontalOnLargeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-on-large.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-on-large.js';

@Component({
  selector: 'obi-damper-horizontal-on-large',
  template: '<ng-content></ng-content>',
})
export class ObiDamperHorizontalOnLarge {
  private _el: ObiDamperHorizontalOnLargeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDamperHorizontalOnLargeElement>,
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

