import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDamperHorizontalOn as ObiDamperHorizontalOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-damper-horizontal-on.js';

@Component({
  selector: 'obi-damper-horizontal-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDamperHorizontalOn {
  private _el: ObiDamperHorizontalOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDamperHorizontalOnElement>,
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

