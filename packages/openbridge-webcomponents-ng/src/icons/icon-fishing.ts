import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFishing as ObiFishingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fishing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fishing.js';

@Component({
  selector: 'obi-fishing',
  template: '<ng-content></ng-content>',
})
export class ObiFishing {
  private _el: ObiFishingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFishingElement>,
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

