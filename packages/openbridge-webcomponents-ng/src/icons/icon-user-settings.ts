import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUserSettings as ObiUserSettingsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-settings.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-settings.js';

@Component({
  selector: 'obi-user-settings',
  template: '<ng-content></ng-content>',
})
export class ObiUserSettings {
  private _el: ObiUserSettingsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUserSettingsElement>,
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

