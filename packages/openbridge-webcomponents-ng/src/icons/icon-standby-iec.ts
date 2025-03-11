import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStandbyIec as ObiStandbyIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-standby-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-standby-iec.js';

@Component({
  selector: 'obi-standby-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStandbyIec {
  private _el: ObiStandbyIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStandbyIecElement>,
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

