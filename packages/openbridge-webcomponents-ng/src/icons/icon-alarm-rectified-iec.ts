import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmRectifiedIec as ObiAlarmRectifiedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-rectified-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-rectified-iec.js';

@Component({
  selector: 'obi-alarm-rectified-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmRectifiedIec {
  private _el: ObiAlarmRectifiedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmRectifiedIecElement>,
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

