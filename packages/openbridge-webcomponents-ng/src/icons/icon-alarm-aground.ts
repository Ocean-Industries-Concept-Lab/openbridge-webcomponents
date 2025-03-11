import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmAground as ObiAlarmAgroundElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-aground.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-aground.js';

@Component({
  selector: 'obi-alarm-aground',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmAground {
  private _el: ObiAlarmAgroundElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmAgroundElement>,
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

