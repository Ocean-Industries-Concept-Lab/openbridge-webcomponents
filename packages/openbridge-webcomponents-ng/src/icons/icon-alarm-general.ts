import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmGeneral as ObiAlarmGeneralElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-general.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-general.js';

@Component({
  selector: 'obi-alarm-general',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmGeneral {
  private _el: ObiAlarmGeneralElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmGeneralElement>,
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

