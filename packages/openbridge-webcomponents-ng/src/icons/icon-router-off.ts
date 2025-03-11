import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouterOff as ObiRouterOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-off.js';

@Component({
  selector: 'obi-router-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouterOff {
  private _el: ObiRouterOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouterOffElement>,
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

