import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPanelIlluminationIec as ObiPanelIlluminationIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-panel-illumination-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-panel-illumination-iec.js';

@Component({
  selector: 'obi-panel-illumination-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPanelIlluminationIec {
  private _el: ObiPanelIlluminationIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPanelIlluminationIecElement>,
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

