import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSettingsUserIec as ObiSettingsUserIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-user-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-user-iec.js';

@Component({
  selector: 'obi-settings-user-iec',
  template: '<ng-content></ng-content>',
})
export class ObiSettingsUserIec {
  private _el: ObiSettingsUserIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSettingsUserIecElement>,
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

