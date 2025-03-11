import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisAtonVirtualIec as ObiAisAtonVirtualIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-virtual-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-aton-virtual-iec.js';

@Component({
  selector: 'obi-ais-aton-virtual-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAisAtonVirtualIec {
  private _el: ObiAisAtonVirtualIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisAtonVirtualIecElement>,
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

