import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSearchlight as ObiLightSearchlightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight.js';

@Component({
  selector: 'obi-light-searchlight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightSearchlight {
  private _el: ObiLightSearchlightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSearchlightElement>,
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

