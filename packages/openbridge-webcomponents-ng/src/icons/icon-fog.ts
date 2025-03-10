import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFog as ObiFogElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fog.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fog.js';

@Component({
  selector: 'obi-fog',
  template: '<ng-content></ng-content>',
})
export class ObiFog {
  private _el: ObiFogElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFogElement>,
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

