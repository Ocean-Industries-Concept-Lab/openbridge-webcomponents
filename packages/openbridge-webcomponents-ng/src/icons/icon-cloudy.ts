import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCloudy as ObiCloudyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cloudy.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cloudy.js';

@Component({
  selector: 'obi-cloudy',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCloudy {
  private _el: ObiCloudyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCloudyElement>,
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

