import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAolColourOn as ObiLightAolColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-colour-on.js';

@Component({
  selector: 'obi-light-aol-colour-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightAolColourOn {
  private _el: ObiLightAolColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAolColourOnElement>,
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

