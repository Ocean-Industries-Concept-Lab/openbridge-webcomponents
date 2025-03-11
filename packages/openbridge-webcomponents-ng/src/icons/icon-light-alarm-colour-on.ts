import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAlarmColourOn as ObiLightAlarmColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm-colour-on.js';

@Component({
  selector: 'obi-light-alarm-colour-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightAlarmColourOn {
  private _el: ObiLightAlarmColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAlarmColourOnElement>,
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

