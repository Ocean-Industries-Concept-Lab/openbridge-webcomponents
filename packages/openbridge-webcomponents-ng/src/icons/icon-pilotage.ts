import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPilotage as ObiPilotageElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pilotage.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pilotage.js';

@Component({
  selector: 'obi-pilotage',
  template: '<ng-content></ng-content>',
})
export class ObiPilotage {
  private _el: ObiPilotageElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPilotageElement>,
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

