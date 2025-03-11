import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCentOffIec as ObiCentOffIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cent-off-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cent-off-iec.js';

@Component({
  selector: 'obi-cent-off-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCentOffIec {
  private _el: ObiCentOffIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCentOffIecElement>,
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

