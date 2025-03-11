import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsionTunnelThruster as ObiPropulsionTunnelThrusterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-tunnel-thruster.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-tunnel-thruster.js';

@Component({
  selector: 'obi-propulsion-tunnel-thruster',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPropulsionTunnelThruster {
  private _el: ObiPropulsionTunnelThrusterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionTunnelThrusterElement>,
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

