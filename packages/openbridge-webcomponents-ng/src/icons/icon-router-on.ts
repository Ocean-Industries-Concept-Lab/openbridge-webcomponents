import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouterOn as ObiRouterOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-on.js';

@Component({
  selector: 'obi-router-on',
  template: '<ng-content></ng-content>',
})
export class ObiRouterOn {
  private _el: ObiRouterOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouterOnElement>,
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

