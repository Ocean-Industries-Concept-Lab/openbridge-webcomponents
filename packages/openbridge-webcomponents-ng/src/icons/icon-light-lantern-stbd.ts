import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternStbd as ObiLightLanternStbdElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd.js';

@Component({
  selector: 'obi-light-lantern-stbd',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightLanternStbd {
  private _el: ObiLightLanternStbdElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternStbdElement>,
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

