import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDamperHorizontalOff as ObiDamperHorizontalOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-off.js';

@Component({
  selector: 'obi-damper-horizontal-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDamperHorizontalOff {
  private _el: ObiDamperHorizontalOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDamperHorizontalOffElement>,
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

