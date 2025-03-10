import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNotunderway as ObiNotunderwayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notunderway.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-notunderway.js';

@Component({
  selector: 'obi-notunderway',
  template: '<ng-content></ng-content>',
})
export class ObiNotunderway {
  private _el: ObiNotunderwayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNotunderwayElement>,
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

