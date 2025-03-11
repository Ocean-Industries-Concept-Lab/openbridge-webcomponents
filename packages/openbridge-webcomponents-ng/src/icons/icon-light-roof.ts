import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRoof as ObiLightRoofElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof.js';

@Component({
  selector: 'obi-light-roof',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRoof {
  private _el: ObiLightRoofElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRoofElement>,
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

