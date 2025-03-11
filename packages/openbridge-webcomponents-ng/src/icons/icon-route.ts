import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRoute as ObiRouteElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route.js';

@Component({
  selector: 'obi-route',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRoute {
  private _el: ObiRouteElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteElement>,
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

