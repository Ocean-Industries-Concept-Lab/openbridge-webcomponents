import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmTriggerGoogle as ObiAlarmTriggerGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-trigger-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-trigger-google.js';

@Component({
  selector: 'obi-alarm-trigger-google',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmTriggerGoogle {
  private _el: ObiAlarmTriggerGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmTriggerGoogleElement>,
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

