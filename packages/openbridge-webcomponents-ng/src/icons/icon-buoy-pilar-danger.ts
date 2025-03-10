import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarDanger as ObiBuoyPilarDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-danger.js';

@Component({
  selector: 'obi-buoy-pilar-danger',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarDanger {
  private _el: ObiBuoyPilarDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarDangerElement>,
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

