import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisAtonPhysicalSelectedIec as ObiAisAtonPhysicalSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-physical-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-physical-selected-iec.js';

@Component({
  selector: 'obi-ais-aton-physical-selected-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisAtonPhysicalSelectedIec {
  private _el: ObiAisAtonPhysicalSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisAtonPhysicalSelectedIecElement>,
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

