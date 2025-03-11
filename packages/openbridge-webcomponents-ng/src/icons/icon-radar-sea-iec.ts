import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarSeaIec as ObiRadarSeaIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-sea-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-sea-iec.js';

@Component({
  selector: 'obi-radar-sea-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarSeaIec {
  private _el: ObiRadarSeaIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarSeaIecElement>,
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

