import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralSouth as ObiBeaconGeneralSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-south.js';

@Component({
  selector: 'obi-beacon-general-south',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconGeneralSouth {
  private _el: ObiBeaconGeneralSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralSouthElement>,
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

