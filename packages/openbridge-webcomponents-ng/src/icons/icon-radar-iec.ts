import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarIec as ObiRadarIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-iec.js';

@Component({
  selector: 'obi-radar-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarIec {
  private _el: ObiRadarIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarIecElement>,
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

