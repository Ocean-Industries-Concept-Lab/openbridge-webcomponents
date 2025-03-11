import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternStbdColourOn as ObiLightLanternStbdColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-colour-on.js';

@Component({
  selector: 'obi-light-lantern-stbd-colour-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightLanternStbdColourOn {
  private _el: ObiLightLanternStbdColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternStbdColourOnElement>,
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

