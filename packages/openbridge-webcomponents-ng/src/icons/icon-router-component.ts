import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouterComponent as ObiRouterComponentElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-component.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-router-component.js';

@Component({
  selector: 'obi-router-component',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouterComponent {
  private _el: ObiRouterComponentElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouterComponentElement>,
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

