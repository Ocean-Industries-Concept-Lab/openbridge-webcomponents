import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternOnColourOn as ObiLightLanternOnColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on-colour-on.js';

@Component({
  selector: 'obi-light-lantern-on-colour-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightLanternOnColourOn {
  private _el: ObiLightLanternOnColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternOnColourOnElement>,
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

