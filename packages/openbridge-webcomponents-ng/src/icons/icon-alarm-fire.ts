import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmFire as ObiAlarmFireElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-fire.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-fire.js';

@Component({
  selector: 'obi-alarm-fire',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmFire {
  private _el: ObiAlarmFireElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmFireElement>,
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

