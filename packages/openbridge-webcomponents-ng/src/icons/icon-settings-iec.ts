import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSettingsIec as ObiSettingsIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-iec.js';

@Component({
  selector: 'obi-settings-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSettingsIec {
  private _el: ObiSettingsIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSettingsIecElement>,
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

