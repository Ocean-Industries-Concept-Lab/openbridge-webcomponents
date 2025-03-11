import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSettingsDefaultIec as ObiSettingsDefaultIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-default-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-default-iec.js';

@Component({
  selector: 'obi-settings-default-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSettingsDefaultIec {
  private _el: ObiSettingsDefaultIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSettingsDefaultIecElement>,
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

