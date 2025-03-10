import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCentIec as ObiCentIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cent-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cent-iec.js';

@Component({
  selector: 'obi-cent-iec',
  template: '<ng-content></ng-content>',
})
export class ObiCentIec {
  private _el: ObiCentIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCentIecElement>,
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

