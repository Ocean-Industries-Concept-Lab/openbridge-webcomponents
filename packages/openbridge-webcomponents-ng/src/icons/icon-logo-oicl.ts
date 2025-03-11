import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogoOicl as ObiLogoOiclElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logo-oicl.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logo-oicl.js';

@Component({
  selector: 'obi-logo-oicl',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogoOicl {
  private _el: ObiLogoOiclElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogoOiclElement>,
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

