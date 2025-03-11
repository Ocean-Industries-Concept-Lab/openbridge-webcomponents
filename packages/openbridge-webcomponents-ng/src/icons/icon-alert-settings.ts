import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertSettings as ObiAlertSettingsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-settings.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-settings.js';

@Component({
  selector: 'obi-alert-settings',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlertSettings {
  private _el: ObiAlertSettingsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertSettingsElement>,
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

