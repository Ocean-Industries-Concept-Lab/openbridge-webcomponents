import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparFlag as ObiBuoySparFlagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-flag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-flag.js';

@Component({
  selector: 'obi-buoy-spar-flag',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySparFlag {
  private _el: ObiBuoySparFlagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparFlagElement>,
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

