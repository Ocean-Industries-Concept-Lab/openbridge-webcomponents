import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKeepingStation as ObiKeepingStationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-station.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keeping-station.js';

@Component({
  selector: 'obi-keeping-station',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiKeepingStation {
  private _el: ObiKeepingStationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKeepingStationElement>,
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

