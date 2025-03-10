import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouter as ObiRouterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router.js';

@Component({
  selector: 'obi-router',
  template: '<ng-content></ng-content>',
})
export class ObiRouter {
  private _el: ObiRouterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouterElement>,
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

