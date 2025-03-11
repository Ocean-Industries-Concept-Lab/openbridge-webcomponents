import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNavigationRoute as ObiNavigationRouteElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-navigation-route.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-navigation-route.js';

@Component({
  selector: 'obi-navigation-route',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiNavigationRoute {
  private _el: ObiNavigationRouteElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNavigationRouteElement>,
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

